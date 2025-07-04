// src/components/EventCalendar.jsx
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../components/calendar.css'; // Import custom styles

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [allEvents, setAllEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/planner/approved-events', {
          withCredentials: true,
        });

        setAllEvents(res.data);

        const uniqueDates = res.data.map(event =>
          new Date(event.date).toDateString()
        );
        setEventDates(uniqueDates);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const tileClassName = ({ date }) => {
    const stringDate = date.toDateString();
    return eventDates.includes(stringDate) ? 'highlight' : null;
  };

  const eventsForSelectedDate = allEvents.filter(
    event => new Date(event.date).toDateString() === value.toDateString()
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6 space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">📅 Event Calendar</h3>
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Events on {value.toDateString()}
          </h3>
          {eventsForSelectedDate.length === 0 ? (
            <p className="text-gray-500">No events on this day.</p>
          ) : (
            <ul className="space-y-4">
              {eventsForSelectedDate.map(event => (
                <li key={event._id} className="border p-3 rounded bg-gray-50 shadow-sm">
                  <h4 className="font-bold text-blue-700">{event.title}</h4>
                  <p className="text-sm text-gray-600">Location: {event.location}</p>
                  <p className="text-sm text-gray-600">Type: {event.type || "N/A"}</p>
                  <p className="text-sm text-gray-600">Max Guests: {event.maxGuests || "N/A"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">📋 All Upcoming Events</h3>
        {allEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {allEvents.map(event => (
              <li key={event._id} className="border p-3 rounded shadow bg-gray-50">
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm">📍 {event.location}</p>
                <p className="text-sm">👥 {event.maxGuests || "N/A"} guests</p>
                <p className="text-sm">🎯 {event.type || "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
