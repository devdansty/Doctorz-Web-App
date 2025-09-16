const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const createAdmin = async () => {
  try {
    const email = 'admin@doctorz.com';
    const password = await bcrypt.hash('admin123', 10);

    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists');
      return process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email,
      password,
      role: 'admin'
    });

    console.log('✅ Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
