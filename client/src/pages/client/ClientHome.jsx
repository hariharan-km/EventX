import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const ClientHome = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/client/my-events', {
          withCredentials: true,
        });
        setEvents(res.data);
        setEventDates(res.data.map(ev => new Date(ev.date).toDateString()));
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const tileClassName = ({ date }) => {
    const today = new Date().toDateString();
    const isToday = date.toDateString() === today;
    const isEventDate = eventDates.includes(date.toDateString());

    if (isEventDate && isToday) {
      return 'bg-yellow-500 text-white font-bold rounded-full';
    } else if (isEventDate) {
      return 'bg-blue-500 text-white font-bold rounded-full';
    } else if (isToday) {
      return 'border border-gray-400 rounded-full';
    }
    return null;
  };

  const selectedEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between mb-8 relative overflow-hidden shadow-md">
        <div className="space-y-2 z-10">
          <h2 className="text-3xl font-bold">Welcome, Client 👋</h2>
          <p className="text-gray-100">Track and manage your upcoming events below.</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3771/3771521.png"
          alt="Client dashboard"
          className="w-32 h-32 object-contain mt-4 md:mt-0 z-10"
        />
        <div className="absolute right-0 bottom-0 opacity-20 w-64 h-64 bg-white rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>

      {/* Calendar + Events */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">📅 Event Calendar</h3>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            className="w-full rounded-lg"
          />
        </div>

        {/* Events Display */}
        <div className="bg-white shadow rounded-xl p-6 overflow-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🗂 {selectedEvents.length > 0
              ? `Events on ${date.toDateString()}`
              : 'All Your Events'}
          </h3>

          {(selectedEvents.length > 0 ? selectedEvents : events).map((event) => (
            <div
              key={event._id}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg mb-4 shadow-sm transition hover:shadow-md"
            >
              <h4 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                📌 {event.title}
              </h4>
              <p className="text-sm text-gray-600">📅 {new Date(event.date).toDateString()}</p>
              <p className="text-sm text-gray-600">📍 {event.location}</p>
              <p className="text-sm text-gray-600">👥 Guests: {event.maxGuests || '—'}</p>
              <p className="text-sm text-gray-600">🎯 Type: {event.type || '—'}</p>
              <p className="text-sm text-gray-600">
                🏷️ Status: <span className="font-semibold">{event.status}</span>
              </p>

              {/* Assigned Staff */}
              {event.staffAssigned ? (
                <div className="mt-2 text-sm text-green-600">
                  👷 Staff Assigned:{' '}
                  <span className="font-semibold">{event.staffAssigned.name}</span> (
                  <a
                    href={`mailto:${event.staffAssigned.email}`}
                    className="text-blue-700 underline"
                  >
                    {event.staffAssigned.email}
                  </a>
                  )
                </div>
              ) : (
                <p className="mt-2 text-sm text-red-500">⚠️ No staff assigned yet</p>
              )}
            </div>
          ))}

          {(events.length === 0 || (selectedEvents.length === 0 && date)) && (
            <div className="text-center py-8 text-gray-500">
              <p>No events to display.</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486785.png"
                alt="No events"
                className="w-24 mx-auto mt-4 opacity-60"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
