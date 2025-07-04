import { getMyAllocatedEvents,getAllStaff,markEventCompleted, getEventById, updateEventDetails } from '../controller/staff.js';
import express from "express";
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';


const router=express.Router();

router.get('/my-events', authenticateToken, authorizeRoles('STAFF'), getMyAllocatedEvents);
router.get('/getstaff', authenticateToken, authorizeRoles('PLANNER'), getAllStaff);

router.put('/event/:id/complete', authenticateToken, authorizeRoles('STAFF'), markEventCompleted);


// router.get(
//   "/my-events",
//   authenticateToken,
//   authorizeRoles("CLIENT"),
//   getMyEvents
// );

router.get('/event/:id', authenticateToken, getEventById);

router.put('/event/:id/update', authenticateToken, updateEventDetails);

export default router;