import express from "express";
import { createEvent,getMyEvents } from "../controller/client.js";
const resourceRouter = express.Router();
import { authenticateToken, authorizeRoles } from "../middleware/Auth.js";

resourceRouter.post(
  "/request",
  authenticateToken,
  authorizeRoles("CLIENT"),
  createEvent
);



export default resourceRouter;
