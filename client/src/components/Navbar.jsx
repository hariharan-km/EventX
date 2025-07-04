import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setRole(res.data.role);
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return null;

  const links = {
    default: [
      { to: "/", label: "Home" },
      { to: "/login", label: "Login" },
      { to: "/signup", label: "Signup" },
    ],
    PLANNER: [
      { to: "/planner-dashboard", label: "Dashboard" },
      { to: "/planner-dashboard/add-event", label: "Add Event" },
      { to: "/planner-dashboard/add-resource", label: "Add Resource" },
      { to: "/planner-dashboard/pending-events", label: "Pending Events" },
      {
        to: "/planner-dashboard/approved-events",
        label: "Approved Events",
        className: "text-green-600 font-semibold",
      },
    ],
    STAFF: [
      { to: "/staff-dashboard", label: "Dashboard" },
      { to: "/staff-dashboard/status", label: "Status" },
      { to: "/staff-dashboard/edit-event", label: "Edit Events" },
    ],
    CLIENT: [
      { to: "/client-dashboard", label: "Dashboard" },
      { to: "/client-dashboard/request", label: "Request Event" },
      {
        to: "/client-dashboard/my-events",
        label: "My Events",
        className: "bg-green-500 text-white px-3 py-1.5 rounded-md",
      },
    ],
  };

  const renderLinks = () =>
    (links[role] || links.default).map(({ to, label, className = "" }, idx) => (
      <li key={idx}>
        <Link
          to={to}
          className={`hover:text-blue-600 transition ${className}`}
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </Link>
      </li>
    ));

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-sky-600 tracking-tight">
          EventX
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {renderLinks()}
          {role && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-3 font-medium text-gray-700 bg-white shadow-sm">
          {renderLinks()}
          {role && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
