import React from 'react';
import { FaLock, FaSadTear } from 'react-icons/fa';

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-4">
    <FaLock className="text-6xl text-red-500 mb-4 animate-bounce" />
    <h1 className="text-4xl font-bold text-red-600 mb-2">403 - Unauthorized</h1>
    <p className="text-lg text-gray-700 max-w-xl">
      Uh-oh! 🚫 Looks like you tried sneaking into a page you're not invited to.<br />
      Don't worry, it happens to the best of us.
    </p>
    <p className="text-md text-gray-600 mt-2">
      Maybe go back 🏃‍♂️ or try logging in with proper credentials.
    </p>
    <FaSadTear className="text-3xl text-gray-500 mt-6" />
  </div>
);

export default Unauthorized;
