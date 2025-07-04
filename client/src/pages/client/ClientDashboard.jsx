import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import ClientHome from './ClientHome';

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 border-b pb-2">
          Welcome to Your Dashboard
        </h2>

        <div className="flex justify-end mb-6">
          <Link
            to="request"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition duration-200 shadow-md"
          >
            <FaPlusCircle className="text-lg" />
            Request New Event
          </Link>
        </div>

        

        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
         
          <Outlet />
           <ClientHome/>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
