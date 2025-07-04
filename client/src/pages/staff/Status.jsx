import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/staff/my-events', {
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch staff events:", error);
      }
    };

    fetchMyEvents();
  }, []);

  const markAsCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/staff/event/${id}/complete`, {}, {
        withCredentials: true,
      });
      alert("Marked as completed ✅");
      setEvents(events.map(e => e._id === id ? { ...e, status: "Completed" } : e));
    } catch (err) {
      alert("❌ Failed to mark as completed");
    }
  };

  // Separate ongoing and completed
  const upcomingEvents = events.filter(event => event.status !== "Completed");
  const completedEvents = events.filter(event => event.status === "Completed");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Assigned Events</h2>

      {/* --- Upcoming or Ongoing Events --- */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">🟢 Ongoing / Upcoming</h3>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-600">No upcoming events assigned.</p>
        ) : (
          upcomingEvents.map(event => (
            <div key={event._id} className="border rounded p-4 mb-4 bg-white shadow">
              <h4 className="text-lg font-semibold">{event.title}</h4>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Status:</strong> <span className="font-medium">{event.status}</span></p>
              <p><strong>Client:</strong> {event.clientId?.email}</p>

              <button
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => markAsCompleted(event._id)}
              >
                Mark as Completed
              </button>
            </div>
          ))
        )}
      </section>

      {/* --- History Section --- */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">📜 Event History (Completed)</h3>
        {completedEvents.length === 0 ? (
          <p className="text-gray-500">No completed events yet.</p>
        ) : (
          completedEvents.map(event => (
            <div key={event._id} className="border rounded p-4 mb-3 bg-gray-50 shadow-sm">
              <h4 className="text-lg font-medium">{event.title}</h4>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Client:</strong> {event.clientId?.email}</p>
              <p className="text-green-700 font-semibold">✔ Completed</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Status;
