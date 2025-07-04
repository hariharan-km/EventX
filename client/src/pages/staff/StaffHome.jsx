import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const StaffHome = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/staff/my-events', {
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch allocated events', err);
      }
    };

    fetchEvents();
  }, []);

  const statusBadge = (status) => {
    const base = "px-3 py-1 text-sm rounded-full font-medium";
    const map = {
      Pending: `${base} bg-yellow-100 text-yellow-800`,
      Approved: `${base} bg-green-100 text-green-800`,
      Rejected: `${base} bg-red-100 text-red-800`,
      Completed: `${base} bg-blue-100 text-blue-800`,
    };
    return map[status] || `${base} bg-gray-100 text-gray-800`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 My Assigned Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-600">No events assigned yet.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white border rounded-xl shadow p-5 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
                <span className={statusBadge(event.status)}>{event.status}</span>
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> {event.location}
                </p>
                <p className="flex items-start gap-2">
                  <FaInfoCircle className="text-gray-500 mt-1" /> <span>Event ID: {event._id}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffHome;
