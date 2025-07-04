import express from 'express';
import { createEvent,getEvents,addResource,allocateResource } from '../controller/planner.js'
import {authenticateToken, authorizeRoles } from '../middleware/Auth.js';
import Resource from '../model/resource.js';
import { getPendingEvents, updateEventStatus } from '../controller/planner.js';

import { getAllResources } from '../controller/resource.js';
import {assignResources} from '../controller/planner.js'
import { getApprovedEvents } from '../controller/planner.js';
import { assignStaffToEvent } from '../controller/planner.js';
import { getPlannerStats } from '../controller/planner.js';

const router = express.Router();

router.post('/create-event', authenticateToken, authorizeRoles("PLANNER"), createEvent);
router.get('/get-event', authenticateToken, getEvents);
router.post('/add-resource', authenticateToken, authorizeRoles("PLANNER"), addResource);
router.post("/allocate-resource", authenticateToken, authorizeRoles("PLANNER"), allocateResource);

router.get("/resources", authenticateToken, async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

router.get(
  '/pending-events',
  authenticateToken,
  authorizeRoles('PLANNER'),
  getPendingEvents
);

router.put(
  '/:id/status',
  authenticateToken,
  authorizeRoles('PLANNER'),
  updateEventStatus
);

router.put(
  '/:id/assign',
  authenticateToken,
  authorizeRoles('PLANNER'),
  assignResources
);

router.get(
  '/all',
  authenticateToken,
  authorizeRoles('PLANNER'),
  getAllResources
);

router.get(
  '/approved-events',
  authenticateToken,
  authorizeRoles('PLANNER'),
  getApprovedEvents
);

router.put('/event/:eventId/assign-staff', authenticateToken, authorizeRoles('PLANNER'), assignStaffToEvent);

router.get("/stats", authenticateToken, authorizeRoles('PLANNER'), getPlannerStats);

export default router;
