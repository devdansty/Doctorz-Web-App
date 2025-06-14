const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate('userId', 'name email role');
  res.json(doctors);
};

const getAllPatients = async (req, res) => {
  const patients = await User.find({ role: 'patient' }).select('-password');
  res.json(patients);
};

const getSystemStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const totalAppointments = await Appointment.countDocuments();

  res.json({
    totalUsers,
    totalDoctors,
    totalAppointments
  });

  
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.role === 'doctor') {
    await Doctor.deleteOne({ userId: user._id });
    await Appointment.deleteMany({ doctorId: user._id });
  }

  await Appointment.deleteMany({ patientId: user._id });
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: 'User deleted' });
};

const blockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  res.json({ message: 'User blocked' });
};

const unblockUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
  res.json({ message: 'User unblocked' });
};

const approveDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  doctor.isApproved = true;
  await doctor.save();
  res.json({ message: 'Doctor approved' });
};

module.exports = {
  getAllDoctors,
  getAllPatients,
  getSystemStats,
  deleteUser,
  blockUser,
  unblockUser,
  approveDoctor
};

