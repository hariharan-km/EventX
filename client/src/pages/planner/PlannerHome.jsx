import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCalendar from '../../components/EventCalendar';
import { FaCalendarAlt, FaClipboardList, FaBoxOpen, FaBoxes, FaUsers } from 'react-icons/fa';

const PlannerHome = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    availableResources: 0,
    allocatedResources: 0,
    staffAssigned: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/planner/stats", {
          withCredentials: true
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching planner stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, Planner 👋</h2>
          <p className="text-gray-600">Here’s a summary of your upcoming tasks and status.</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3811/3811524.png"
          alt="planner"
          className="w-28 h-28 mt-4 md:mt-0"
        />
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-5 text-gray-700">📊 Dashboard Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Events"
            count={stats.totalEvents}
            icon={<FaCalendarAlt className="text-blue-500 text-2xl" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Upcoming Events"
            count={stats.upcomingEvents}
            icon={<FaClipboardList className="text-green-600 text-2xl" />}
            color="bg-green-100"
          />
          <StatCard
            title="Resources Available"
            count={stats.availableResources}
            icon={<FaBoxOpen className="text-yellow-500 text-2xl" />}
            color="bg-yellow-100"
          />
          <StatCard
            title="Resources Allocated"
            count={stats.allocatedResources}
            icon={<FaBoxes className="text-red-500 text-2xl" />}
            color="bg-red-100"
          />
          <StatCard
            title="Staff Assigned"
            count={stats.staffAssigned}
            icon={<FaUsers className="text-purple-600 text-2xl" />}
            color="bg-purple-100"
          />
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-5 text-gray-700">🗓 Event Calendar</h3>
        <div className="bg-white p-4 rounded-xl shadow">
          <EventCalendar />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, count, icon, color }) => (
  <div className={`${color} p-5 rounded-xl shadow hover:shadow-md transition-all`}>
    <div className="flex items-center justify-between">
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <div>{icon}</div>
    </div>
    <p className="text-4xl font-bold text-gray-900 mt-3">{count}</p>
  </div>
);

export default PlannerHome;
