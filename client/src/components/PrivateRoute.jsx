import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const PrivateRoute = ({ allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/auth/user`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.includes(user.role)) return <Outlet />;

  return <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
