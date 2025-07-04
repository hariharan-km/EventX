import mongoose from "mongoose";

const plannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Pending",
      "Approved",
      "In Progress",
      "PLANNED",
      "ONGOING",
      "COMPLETED",
      "CANCELLED",
    ],
    default: "PLANNED",
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  maxGuests: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ["MEETING", "CONFERENCE", "WORKSHOP", "WEBINAR", "OTHER"],
    default: "MEETING",
  },
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Planner = mongoose.model("Planner", plannerSchema);
export default Planner;
