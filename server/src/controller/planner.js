import Event from "../model/Event.js";
import Resource from '../model/resource.js';
import User from "../model/User.js";
import sendEmail from "../utils/sendEmail.js";
import Allocation from '../model/Allocation.js';

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      dateTime,
      location,
      status,
      isPublic,
      maxGuests,
      type,
    } = req.body;

    if (!title || !description || !dateTime || !location || !status || !type) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const newEvent = new Event({
      title,
      description,
      date: new Date(dateTime), // ensure proper conversion
      location,
      status,
      isPublic,
      maxGuests,
      type,
    });

    const savedEvent = await newEvent.save();

    // Send email to all clients (optional)
    const clients = await User.find({ role: 'CLIENT' });
    const emails = clients.map(client => client.email);

    const subject = '📢 New Event Scheduled!';
    const text = `Hello!\n\nA new event has been scheduled:\n\n📌 Title: ${title}\n🗓 Date & Time: ${new Date(dateTime).toLocaleString()}\n📍 Location: ${location}\n\nStay tuned!`;

    if (emails.length > 0) {
      await sendEmail(emails.join(','), subject, text);
    }

    return res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return res.status(500).json({ error: "Failed to delete event" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    dateTime,
    location,
    status,
    isPublic,
    maxGuests,
    type,
  } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dateTime,
        location,
        status,
        isPublic,
        maxGuests,
        type,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error.message);
    return res.status(500).json({ error: "Failed to update event" });
  }
};

export const addResource = async (req, res) => {
  try {
    const { name, type, quantity, availability, description } = req.body;

    if (!name || !type || quantity == null) {
      return res.status(400).json({ error: "Name, type, and quantity are required." });
    }

    const newResource = new Resource({
      name,
      type,
      quantity,
      availability,
      description
    });

    const saved = await newResource.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding resource:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const allocateResource = async (req, res) => {
  try {
    const { eventId, resourceId, quantity } = req.body;

    const resource = await Resource.findById(resourceId);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    if (!resource.availability || resource.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient resource quantity" });
    }

    const allocation = new Allocation({
      event: eventId,
      resource: resourceId,
      quantity,
    });

    await allocation.save();

    // Optional: Decrease available quantity
    resource.quantity -= quantity;
    await resource.save();

    res.status(201).json({ message: "Resource allocated successfully", allocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to allocate resource" });
  }
};

export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'Pending' }).populate('clientId', 'email');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching pending events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: `Event ${status.toLowerCase()} successfully`,
      event: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};

export const assignResources = async (req, res) => {
  try {
    const { id } = req.params; // event ID
    const { resources } = req.body; 

    if (!Array.isArray(resources)) {
      return res.status(400).json({ message: 'resources must be an array of { resource, quantity }' });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'Approved') {
      return res.status(400).json({ message: 'Only approved events can be assigned resources' });
    }

    // Step 1: Save only resource IDs to the event
    event.resourcesAllocated = resources.map(r => r.resource);
    const updatedEvent = await event.save();

    // Step 2: Save detailed allocations and reduce available quantities
    for (const r of resources) {
      const resourceDoc = await Resource.findById(r.resource);
      if (!resourceDoc) continue;

      if (resourceDoc.quantity < r.quantity) {
        return res.status(400).json({ message: `Insufficient quantity for resource: ${resourceDoc.name}` });
      }

      // Create Allocation record
      await Allocation.create({
        event: id,
        resource: r.resource,
        quantity: r.quantity
      });

      // Decrease quantity
      resourceDoc.quantity -= r.quantity;

      // Optional: mark as unavailable if quantity is zero
      if (resourceDoc.quantity === 0) {
        resourceDoc.availability = false;
      }

      await resourceDoc.save();
    }

    res.status(200).json({
      message: 'Resources assigned successfully',
      event: updatedEvent
    });

  } catch (error) {
    console.error('Error assigning resources:', error);
    res.status(500).json({ message: 'Failed to assign resources' });
  }
};


export const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'Approved' }).populate('clientId', 'email');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching approved events:', error);
    res.status(500).json({ message: 'Failed to fetch approved events' });
  }
};

export const assignStaffToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { staffId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // ✅ Use correct field name from schema
    if (event.staffAssigned) {
      return res.status(400).json({ message: 'Staff already assigned to this event' });
    }

    event.staffAssigned = staffId;
    await event.save();

    res.status(200).json({ message: 'Staff assigned successfully', event });
  } catch (err) {
    console.error('Error assigning staff:', err);
    res.status(500).json({ message: 'Failed to assign staff' });
  }
};


export const getPlannerStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ status: 'Approved', date: { $gte: new Date() } });

    const allResources = await Resource.find();
    const availableResources = allResources.reduce((sum, r) => sum + r.quantity, 0);
    const allocatedResources = allResources.reduce((sum, r) => sum + r.allocatedQuantity, 0);

    const staffAssigned = await Event.countDocuments({ staffAssigned: { $ne: null } });

    res.status(200).json({
      totalEvents,
      upcomingEvents,
      availableResources,
      allocatedResources,
      staffAssigned
    });
  } catch (err) {
    console.error("Error fetching planner stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
