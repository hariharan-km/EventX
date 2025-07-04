import { Briefcase, Users, CalendarCheck } from "lucide-react"; // optional: use any icon set

const RoleHighlights = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-12 lg:px-24">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Role-Based Highlights
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          See how each role benefits from the platform.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Event Planners */}
        <div className="group bg-white border rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-center mb-4 text-blue-600">
            <Briefcase size={36} />
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">
            Event Planners
          </h3>
          <p className="text-gray-600 text-center">
            Plan schedules, assign resources, and oversee every step of event execution.
          </p>
        </div>

        {/* Venue Staff */}
        <div className="group bg-white border rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-center mb-4 text-green-600">
            <Users size={36} />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2 text-center">
            Venue Staff
          </h3>
          <p className="text-gray-600 text-center">
            Stay updated on assigned setups and tasks with live resource availability.
          </p>
        </div>

        {/* Clients */}
        <div className="group bg-white border rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-center mb-4 text-purple-600">
            <CalendarCheck size={36} />
          </div>
          <h3 className="text-xl font-bold text-purple-700 mb-2 text-center">
            Clients
          </h3>
          <p className="text-gray-600 text-center">
            Monitor event status, view timelines, and stay in direct touch with planners.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoleHighlights;
