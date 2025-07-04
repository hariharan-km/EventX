import Event from '../model/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, requirements, maxGuests, type } = req.body;

    const clientId = req.user.id;

    const event = new Event({
      title,
      description,
      date,
      location,
      requirements,
      clientId,
      maxGuests,
      type,
    });

    const savedEvent = await event.save();

    res.status(201).json({
      message: 'Event request submitted successfully',
      event: savedEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error while creating event' });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ clientId: req.user.id })
      .populate('staffAssigned', 'name email') // <-- populate staff details
      .sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching client events:', error);
    res.status(500).json({ message: 'Failed to fetch client events' });
  }
};

export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'Pending' }).populate('clientId', 'email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending events' });
  }
};





