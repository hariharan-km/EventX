import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["PLANNER", "STAFF", "CLIENT"],
      default: "CLIENT",
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("User", userSchema);
export default usermodel;
