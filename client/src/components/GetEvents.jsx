import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './calendar.css'; // Custom styles for marking tiles

const GetEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get("http://localhost:5000/api/planner/get-event", { withCredentials: true })
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Create a Set of string dates that have events
  const eventDates = new Set(
    events.map(event => new Date(event.dateTime).toDateString())
  );

  // Function to highlight calendar tiles with events
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      if (eventDates.has(dateStr)) {
        return 'event-day'; // CSS class to highlight the date
      }
    }
    return null;
  };

  // Events only for selected date
  const eventsOnSelectedDate = events.filter(event =>
    new Date(event.dateTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Event Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <h3 className="mt-6 text-lg font-semibold">
        Events on {selectedDate.toDateString()}:
      </h3>

      {eventsOnSelectedDate.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {eventsOnSelectedDate.map(event => (
            <li key={event._id} className="p-2 border rounded shadow-sm bg-gray-100">
              <strong>{event.title}</strong> – {event.location}
              <div className="text-sm text-gray-500">{new Date(event.dateTime).toLocaleTimeString()}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-2">No events on this date.</p>
      )}

      <h3 className="mt-8 text-lg font-semibold">📋 All Scheduled Events:</h3>
      {events.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {events.map(event => (
            <li key={event._id} className="p-2 border rounded bg-white shadow">
              <div className="font-bold">{event.title}</div>
              <div className="text-sm text-gray-600">
                {new Date(event.dateTime).toLocaleString()} at {event.location}
              </div>
              <div className="text-xs text-gray-500">Status: {event.status}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-2">No events found.</p>
      )}
    </div>
  );
};

export default GetEvents;
