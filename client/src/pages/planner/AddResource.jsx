import React, { useState } from 'react';
import axios from 'axios';
import { FaTools, FaCubes, FaToggleOn } from 'react-icons/fa';

const AddResource = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'EQUIPMENT',
    quantity: 0,
    availability: true,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/planner/add-resource', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(res.data);
      setFormData({
        name: '',
        type: 'EQUIPMENT',
        quantity: 0,
        availability: true,
        description: ''
      });
      alert("✅ Resource added!");
    } catch (error) {
      console.error("Error adding resource:", error.response?.data || error.message);
      alert('❌ Failed to add resource');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <div className="flex items-center gap-3 text-blue-700">
        <FaTools className="text-2xl" />
        <h2 className="text-2xl font-bold">Add a New Resource</h2>
      </div>
      <p className="text-sm text-gray-500">Fill in the details of the resource you'd like to add to your inventory.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Resource Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300"
            placeholder="e.g. LED Wall, Projector"
          />
        </div>

        {/* Type & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="EQUIPMENT">Equipment</option>
              <option value="STAFF">Staff</option>
              <option value="SERVICE">Service</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
              placeholder="e.g. 5"
              min="0"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="accent-blue-600 scale-125"
          />
          <span className="text-gray-700 font-medium">
            {formData.availability ? 'Available' : 'Not Available'}
          </span>
          <FaToggleOn className={`text-xl ${formData.availability ? 'text-green-500' : 'text-gray-400'}`} />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="e.g. High-definition projector suitable for large venues"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResource;
