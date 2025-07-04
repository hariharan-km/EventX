import React, { useState, useEffect } from "react";
import axios from "axios";

const AllocateResource = () => {
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    eventId: "",
    resourceId: "",
    quantity: 1,
  });

  useEffect(() => {
    // Fetch Events
    axios.get("http://localhost:5000/api/planner/get-event", { withCredentials: true })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch Resources
    axios.get("http://localhost:5000/api/planner/resources", { withCredentials: true })
      .then((res) => setResources(res.data))
      .catch((err) => console.error("Error fetching resources:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/planner/allocate-resource", formData, {
        withCredentials: true,
      });
      alert("Resource allocated successfully!");
      setFormData({ eventId: "", resourceId: "", quantity: 1 });
    } catch (err) {
      console.error(err);
      alert("Failed to allocate resource");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-lg mx-auto mt-4" id="allocate-resource">
      <h2 className="text-xl font-bold mb-4">Allocate Resource to Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Select Event *</label>
          <select name="eventId" value={formData.eventId} onChange={handleChange} required className="w-full border p-2">
            <option value="">-- Select Event --</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>{event.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Resource *</label>
          <select name="resourceId" value={formData.resourceId} onChange={handleChange} required className="w-full border p-2">
            <option value="">-- Select Resource --</option>
            {resources.map(resource => (
              <option key={resource._id} value={resource._id}>
                {resource.name} ({resource.quantity} available)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Quantity *</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Allocate
        </button>
      </form>
    </div>
  );
};

export default AllocateResource;
