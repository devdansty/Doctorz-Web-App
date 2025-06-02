const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ['admin', 'doctor', 'patient'],
      default: 'patient',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
