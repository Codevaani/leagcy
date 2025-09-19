import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  preferences: {
    dietary: [String],
    spiceLevel: { type: String, enum: ['mild', 'medium', 'spicy'] }
  },
  subscription: {
    plan: String,
    status: { type: String, enum: ['active', 'inactive', 'paused'] },
    startDate: Date,
    endDate: Date
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
