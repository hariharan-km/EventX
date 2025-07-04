import express from "express"
import dotenv from "dotenv";
import connectDB from "./src/config/dbconnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./src/router/Auth.js";
import plannerRoutes from "./src/router/planner.js";
import clientRoutes from "./src/router/client.js";
import staffRoutes from "./src/router/staff.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true 
}));

app.get("/", (req, res) => {
  res.send("testing")
})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/staff",staffRoutes );

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
