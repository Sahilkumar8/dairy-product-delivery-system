import React from "react";
import { Navigate } from "react-router-dom";

// Wraps any page that should only be visible to logged-in users
// If no token is found, redirects to Login instead of showing the page
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;