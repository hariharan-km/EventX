const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">EventX</h2>
          <p className="text-sm">
            Streamlining event management through smart planning, role-based collaboration, and resource optimization.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/register" className="hover:text-white">Register</a></li>
            <li><a href="/unauthorized" className="hover:text-white">Unauthorized</a></li>
          </ul>
        </div>

        {/* Role-Based */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Role Dashboards</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/planner/dashboard" className="hover:text-white">Planner</a></li>
            <li><a href="/staff/dashboard" className="hover:text-white">Staff</a></li>
            <li><a href="/client/dashboard" className="hover:text-white">Client</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EventX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
