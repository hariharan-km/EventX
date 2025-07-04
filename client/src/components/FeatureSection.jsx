const FeatureSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Streamline Your Events with Confidence
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our powerful platform empowers event planners, venue staff, and clients
            with real-time collaboration, smart resource allocation, and seamless communication.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>📅 Schedule and manage events in one place</li>
            <li>📦 Allocate and track equipment & staff</li>
            <li>📊 Role-based dashboards for better control</li>
          </ul>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-md font-medium">
            Explore the Platform
          </button>
        </div>

        {/* Image */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
            alt="Event management"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
