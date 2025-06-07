const User = require('../models/User');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.role !== role) {
    return res.status(401).json({ message: 'Invalid credentials or role' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  if (user.isBlocked) {
    return res.status(403).json({ message: 'Your account is blocked' });
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};


const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  if (role === 'doctor') {
    const { specialization, phone, license, qualifications, profilePic, city } = req.body;

   await Doctor.create({
  userId: user._id,
  specialization,
  phone,
  license,
  qualifications,
  profilePic,
  city
});

  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};



module.exports = { loginUser ,registerUser};
