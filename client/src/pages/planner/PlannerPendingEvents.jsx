import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaEnvelope, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

const PlannerPendingEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/planner/pending-events', {
      withCredentials: true,
    });
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/planner/${id}/status`,
        { status },
        { withCredentials: true }
      );
      fetchEvents();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Pending Event Requests</h2>

      {events.length === 0 ? (
        <div className="text-gray-500 text-lg">No pending events at the moment.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-md p-6 space-y-3 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaCalendarAlt className="text-blue-500" />
                {new Date(event.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaMapMarkerAlt className="text-red-500" />
                {event.location}
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaEnvelope className="text-green-500" />
                {event.clientId?.email || 'N/A'}
              </div>

              <div className="flex items-start gap-2 text-gray-600 text-sm">
                <FaClipboardList className="text-yellow-500 mt-1" />
                <span><strong>Requirements:</strong> {event.requirements || "Not specified"}</span>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleStatusChange(event._id, 'Approved')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleStatusChange(event._id, 'Rejected')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlannerPendingEvents;
