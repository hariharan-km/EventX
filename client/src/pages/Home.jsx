import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleHighlights from '../components/RoleHighlights';
import FeatureSection from '../components/FeatureSection';
import UseCaseSlider from '../components/UseCaseSlider';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import eventAnimation from '../assets/event-3d.json';
import HowItWorks from '../components/HowItWorks.jsx';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-purple-100 min-h-screen flex items-center justify-center">
        {/* Animated Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-300 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-pink-300 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>

        {/* Content Grid */}
        <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 md:px-16 py-24 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="backdrop-blur-md bg-white/70 border border-white/30 rounded-3xl shadow-xl p-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Plan. Organize. <span className="text-sky-600">Celebrate.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your all-in-one solution for seamless event management and resource allocation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-purple-600 text-white text-lg rounded-xl shadow-md hover:scale-105 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 border border-sky-600 text-sky-600 text-lg rounded-xl hover:bg-sky-50 transition"
              >
                Login
              </button>
            </div>
          </div>

          {/* Right Animation */}
          <div className="flex justify-center">
            <Lottie
              animationData={eventAnimation}
              loop
              autoplay
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <UseCaseSlider />
     
      <FeatureSection />
       <RoleHighlights />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
