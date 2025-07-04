import Resource from "../model/resource.js";
import Event from '../model/Event.js';

export const addResource = async (req, res) => {
  try {
    const { name, type, quantity, availability, description } = req.body;

    if (!name || !type || quantity == null) {
      return res.status(400).json({ message: "Name, type and quantity are required." });
    }

    const newResource = new Resource({
      name,
      type,
      quantity,
      availability,
      description,
    });

    const savedResource = await newResource.save();

    return res.status(201).json(savedResource);
  } catch (error) {
    console.error("Error creating resource:", error.message);
    res.status(500).json({ message: "Failed to create resource" });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};



