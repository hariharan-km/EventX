import React, { useState } from "react";

const EventRequestForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    type: "",
    maxGuests: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit API here
    alert("Event request submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-800">🎉 Create an Event</h2>
      <p className="text-center text-gray-500">
        Fill in your event details below and let us handle the rest!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              placeholder="e.g. John's Wedding"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              placeholder="e.g. Hyatt Dubai"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Event Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              required
            >
              <option value="">Select Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Guest and Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Maximum Guests</label>
            <input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              placeholder="e.g. 200"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Special Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="mt-1 w-full border rounded p-2"
              rows={3}
              placeholder="e.g. Need DJ, vegan catering, LED screen, etc."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRequestForm;
