import React, { useState } from 'react';
import axios from 'axios';

const EventRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    requirements: '',
    maxGuests: '',
    type: 'MEETING'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type: inputType } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/client/request',
        formData,
        { withCredentials: true }
      );

      console.log('Event request response:', res.data);

      setMessage('✅ Event request submitted successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        requirements: '',
        maxGuests: '',
        type: 'MEETING'
      });
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Error submitting request');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Request a New Event</h3>

      {message && <div className="mb-4 text-blue-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Special Requirements"
          className="w-full border p-2 rounded"
        />

        {/* New Fields */}
        <input
          type="number"
          name="maxGuests"
          value={formData.maxGuests}
          onChange={handleChange}
          placeholder="Maximum Number of Guests"
          className="w-full border p-2 rounded"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="MEETING">Meeting</option>
          <option value="CONFERENCE">Conference</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="WEBINAR">Webinar</option>
          <option value="OTHER">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default EventRequestForm;
