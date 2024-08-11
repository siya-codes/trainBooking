import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: '5m', default: Date.now } // OTP expires after 5 minutes
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
