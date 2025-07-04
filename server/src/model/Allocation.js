import mongoose from 'mongoose';

const allocationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  }
}, { timestamps: true });

export default mongoose.model('Allocation', allocationSchema);
