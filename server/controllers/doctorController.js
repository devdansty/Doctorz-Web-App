const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

// Get Doctor Dashboard
const getDoctorDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const allAppointments = await Appointment.find({ doctorId: doctor._id });
    const completedAppointments = allAppointments.filter((a) => a.status === 'completed');
    const todayAppointments = allAppointments.filter(
      (a) => a.date >= today && a.date < tomorrow
    );

    const todaySchedule = await Promise.all(
      todayAppointments.map(async (a) => {
        const patient = await User.findById(a.patientId);
        return {
          id: a._id,
          time: a.time,
          purpose: a.purpose,
          status: a.status,
          patient: {
            name: patient.name,
            photo: patient.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'
          }
        };
      })
    );

    res.json({
      id: doctor._id,
      name: req.user.name,
      specialization: doctor.specialization,
      photo: doctor.profilePic || 'https://randomuser.me/api/portraits/men/45.jpg',
      totalAppointments: allAppointments.length,
      completedAppointments: completedAppointments.length,
      todayAppointments: todayAppointments.length,
      rating: 4.8, // placeholder
      todaySchedule
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const addAvailability = async (req, res) => {
  try {
    const doctorUserId = req.user._id;
    const { date, slots } = req.body;

    if (!date || !Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: 'Date and at least one slot required' });
    }

    const doctor = await Doctor.findOne({ userId: doctorUserId });
    if (!doctor) {
      return res.status(403).json({ message: 'Not authorized as doctor' });
    }

    const formattedDate = new Date(date);
    let availability = await Availability.findOne({ doctorId: doctor._id, date: formattedDate });

    if (availability) {
      availability.slots = slots;
      await availability.save();
      return res.json({ message: 'Availability updated' });
    }

    await Availability.create({
      doctorId: doctor._id,
      date: formattedDate,
      slots,
    });

    res.status(201).json({ message: 'Availability added successfully' });
  } catch (error) {
    console.error('Add Availability Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const formattedDate = new Date(date);
    const availability = await Availability.findOne({ doctorId, date: formattedDate });

    if (!availability || !availability.slots.length) {
      return res.json({ slots: [] });
    }

    const booked = await Appointment.find({ doctorId, date: formattedDate }).distinct('time');
    const availableSlots = availability.slots.filter(
      (slot) => !booked.includes(slot)
    );

    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Get Availability Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search doctors by specialization or city or name
const searchDoctors = async (req, res) => {
  try {
    const query = req.query.q || '';
    const regex = new RegExp(query, 'i');

    const results = await Doctor.find({
      $or: [
        { specialization: regex },
        { city: regex }
      ],
    }).populate('userId', 'name email');

    const filtered = results.filter(doctor => 
      regex.test(doctor.userId.name) || 
      regex.test(doctor.specialization) || 
      regex.test(doctor.city)
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Doctor Profile
const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id }).populate('userId', 'name email');
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const { specialization, city, profilePic, ...otherFields } = req.body;

    if (specialization) doctor.specialization = specialization;
    if (city) doctor.city = city;
    if (profilePic) doctor.profilePic = profilePic;
    // Add updates for other fields if needed here

    await doctor.save();
    res.json({ message: 'Profile updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Doctor Account (and related data optionally)
const deleteDoctorAccount = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    // Delete doctor
    await Doctor.deleteOne({ _id: doctor._id });
    // Delete user
    await User.deleteOne({ _id: req.user._id });

    // Optionally, delete related appointments and availability
    await Appointment.deleteMany({ doctorId: doctor._id });
    await Availability.deleteMany({ doctorId: doctor._id });

    res.json({ message: 'Doctor account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name photo') 
      .lean();

    const seen = new Set();
    const uniquePatients = [];

    for (let appt of appointments) {
      if (!seen.has(appt.patient._id.toString())) {
        seen.add(appt.patient._id.toString());

        const lastAppointment = appointments
          .filter(a => a.patient._id.toString() === appt.patient._id.toString())
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        uniquePatients.push({
          id: appt.patient._id,
          name: appt.patient.name,
          photo: appt.patient.photo,
          lastAppointment: lastAppointment.date,
          totalVisits: appointments.filter(a => a.patient._id.toString() === appt.patient._id.toString()).length
        });
      }
    }

    res.json(uniquePatients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching patients' });
  }
};

const getTodaySchedule = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Find appointments for today
    const appointments = await Appointment.find({
      doctorId: doctor._id,
      date: today
    }).populate('patientId', 'name');

    // Format response
    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      time: appt.time,
      patientName: appt.patientId.name
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error in getTodaySchedule:', error);
    res.status(500).json({ message: 'Server error while fetching today\'s schedule' });
  }
};

module.exports = {
  getDoctorDashboard,
  addAvailability,
  getAvailability,
  searchDoctors,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorAccount,
  getDoctorPatients,
  getTodaySchedule
};

