const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    license: { type: String, required: true },
    city: {type: String, required: true},
    qualifications: { type: String },
    profilePic: { type: String },
    isApproved: { type: Boolean, default: false }



  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
