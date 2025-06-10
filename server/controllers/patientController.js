const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getPatientDashboard = async (req, res) => {
  const userId = req.user._id;

  const patient = await User.findById(userId);
  if (!patient || patient.role !== 'patient') {
    return res.status(403).json({ message: 'Not authorized as patient' });
  }

  const allAppointments = await Appointment.find({ patientId: userId });

  const completedAppointments = allAppointments.filter(
    (a) => a.status === 'completed'
  );

 const upcomingAppointments = allAppointments.filter(
  (a) => new Date(a.date) >= new Date()
);

 const upcoming = await Promise.all(
  upcomingAppointments.map(async (a) => {
    const doctor = await Doctor.findById(a.doctorId).populate('userId');
    return {
      doctor: {
        name: doctor?.userId?.name || 'Unknown Doctor',
        specialization: doctor?.specialization || 'General',
        photo: doctor?.profilePic || 'https://randomuser.me/api/portraits/men/44.jpg',
      },
      date: a.date,
      time: a.time,
      status: a.status,
    };
  })
);

  res.json({
    name: patient.name,
    photo: patient.photo || 'https://randomuser.me/api/portraits/women/65.jpg',
    totalAppointments: allAppointments.length,
    completedAppointments: completedAppointments.length,
    upcomingAppointments: upcoming.length,
    upcoming,
  });
};



const getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name photo');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      photo: user.photo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPatientProfile };


const updateProfile = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.city = city || user.city;

    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({
      name: user.name,
      email: user.email,
      city: user.city,
      photo: user.profilePic,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: 'Account deleted successfully' });
};

module.exports = { getPatientDashboard, updateProfile, deleteAccount,getPatientProfile };
