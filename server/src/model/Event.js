import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // optional for planner-created events
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  requirements: { type: String },
  createdAt: { type: Date, default: Date.now },

  resourcesAllocated: [
    {
      resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],

  staffAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPublic: { type: Boolean, default: false },
  maxGuests: { type: Number },
  type: { type: String },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
