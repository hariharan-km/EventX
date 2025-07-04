import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

const PlannerDashboard = () => {
  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Planner Dashboard</h2> */}
      <Outlet />
    </div>
  );
};

export default PlannerDashboard;
