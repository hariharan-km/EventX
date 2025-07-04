import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTags, FaInfoCircle } from 'react-icons/fa';

const MyEventRequests = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/client/my-events', {
          withCredentials: true
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Completed: 'bg-blue-100 text-blue-800'
  };

  if (loading) {
    return <p className="text-center text-gray-500 text-lg mt-6">Loading your event requests...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 My Event Requests</h2>

      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all duration-300 p-5"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[event.status] || 'bg-gray-100 text-gray-800'}`}>
                  {event.status}
                </span>
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" /> 
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {event.location}
                </p>

                <p className="flex items-center gap-2">
                  <FaUsers className="text-indigo-500" />
                  Max Guests: {event.maxGuests || 'Not specified'}
                </p>

                <p className="flex items-center gap-2">
                  <FaTags className="text-purple-500" />
                  Type: {event.type || 'Not specified'}
                </p>

                <p className="flex items-start gap-2">
                  <FaInfoCircle className="text-gray-500 mt-1" />
                  <span>Requirements: {event.requirements || '—'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventRequests;
