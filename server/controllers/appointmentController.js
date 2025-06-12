const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Book Appointment (patient)
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for slot conflict
    const existing = await Appointment.findOne({
      doctorId,
      date,
      time
    });
    if (existing) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user._id,
      date,
      time,
      status: 'confirmed'
    });

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient's appointments
const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user._id;

    const appointments = await Appointment.find({ patientId }).sort({ date: -1 });

    const formatted = await Promise.all(
      appointments.map(async (app) => {
        const doctor = await Doctor.findById(app.doctorId).populate('userId');
        return {
          id: app._id,
          doctor: {
            name: doctor.userId.name,
            specialization: doctor.specialization,
            photo: doctor.profilePic || 'https://randomuser.me/api/portraits/men/44.jpg',
          },
          date: app.date,
          time: app.time,
          status: app.status
        };
      })
    );

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel appointment (patient)
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.user._id;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    if (appointment.patientId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not your appointment' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel appointment by doctor
const cancelByDoctor = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const doctorUserId = req.user._id;

    const doctor = await Doctor.findOne({ userId: doctorUserId });
    if (!doctor) return res.status(403).json({ message: 'Not authorized as doctor' });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    if (appointment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Not your appointment' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled by doctor' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get appointments for logged-in doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorUserId = req.user._id;

    const doctor = await Doctor.findOne({ userId: doctorUserId });
    if (!doctor) return res.status(403).json({ message: 'Not authorized as doctor' });

    const appointments = await Appointment.find({ doctorId: doctor._id }).sort({ date: -1 });

    const formatted = await Promise.all(
      appointments.map(async (app) => {
        const patient = await User.findById(app.patientId);
        return {
          id: app._id,
          patient: {
            name: patient.name,
            photo: patient.photo || 'https://randomuser.me/api/portraits/lego/1.jpg',
          },
          date: app.date,
          time: app.time,
          status: app.status,
          purpose: app.purpose || ''
        };
      })
    );

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  cancelByDoctor,
  getDoctorAppointments
};
