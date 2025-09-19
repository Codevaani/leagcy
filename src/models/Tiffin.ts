import mongoose from 'mongoose';

const TiffinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  imageKit: {
    fileId: String,
    filePath: String,
    url: String
  },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  badges: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Tiffin || mongoose.model('Tiffin', TiffinSchema);
