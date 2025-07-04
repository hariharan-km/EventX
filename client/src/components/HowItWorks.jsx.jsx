import { FaUserPlus, FaCalendarCheck, FaCogs, FaChartLine } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus size={28} />,
    title: "Register Your Role",
    description: "Sign up as a planner, staff, or client to access features tailored to your responsibilities.",
    color: "bg-blue-600",
  },
  {
    icon: <FaCalendarCheck size={28} />,
    title: "Schedule or Join Events",
    description: "Planners can create and manage events while staff and clients view or join assigned activities.",
    color: "bg-green-500",
  },
  {
    icon: <FaCogs size={28} />,
    title: "Manage Resources",
    description: "Allocate equipment, assign staff, and ensure seamless event execution through role-specific tools.",
    color: "bg-yellow-500",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Track Progress",
    description: "Monitor event timelines, status updates, and real-time resource usage.",
    color: "bg-purple-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">How It Works</h2>
        <p className="text-gray-500 mt-2 text-lg">A seamless journey from planning to execution</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 hidden md:block" />

        <div className="space-y-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`md:flex md:items-center ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} relative`}
            >
              {/* Icon */}
              <div className="flex justify-center md:w-1/2">
                <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg z-10`}>
                  {step.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-gray-100 rounded-xl shadow-md p-6 mt-6 md:mt-0 md:w-1/2">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
