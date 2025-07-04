import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import PlannerDashboard from "./pages/planner/PlannerDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import Unauthorized from "./pages/Unauthorized";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateEvent from "./pages/planner/CreateEvent";
import GetEvents from "./components/GetEvents";
import AddResource from "./pages/planner/AddResource";
import AllocateResource from "./pages/planner/AllocateResource";
import "./App.css";
import PlannerHome from "./pages/planner/plannerHome";
import StaffHome from "./pages/staff/staffHome";
import EditEvent from "./pages/staff/EditEvent";
import ClientHome from "./pages/client/ClientHome";
import EventRequestForm from "./pages/client/EventRequestForm";
import MyEventRequests  from  "./pages/client/MyEventRequests"
import PlannerPendingEvents from "./pages/planner/PlannerPendingEvents";
import PlannerAssignResources from "./pages/planner/PlannerAssignResources";
import Status from './pages/staff/Status';
import './index.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute allowedRoles={["PLANNER"]} />}>
          <Route path="/planner-dashboard" element={<PlannerDashboard />}>
            <Route index element={<PlannerHome />} />
            <Route path="add-event" element={<CreateEvent />} />
            <Route path="add-resource" element={<AddResource />} />
           
             <Route path="pending-events" element={<PlannerPendingEvents />} />
             <Route path="approved-events" element={<PlannerAssignResources />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["STAFF"]} />}>
          <Route path="/staff-dashboard" element={<StaffDashboard />}>
            <Route index element={<StaffHome />} />
            <Route path="edit-event" element={<EditEvent />} />
             <Route path="status" element={<Status />} />
           
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["CLIENT"]} />}>
          <Route path="/client-dashboard" element={<ClientDashboard />}>
            <Route path="view" element={<ClientHome />} />
            <Route path="request" element={<EventRequestForm />} />
            <Route path="my-events" element={<MyEventRequests />} />
            
          </Route>

        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
};

export default App;
