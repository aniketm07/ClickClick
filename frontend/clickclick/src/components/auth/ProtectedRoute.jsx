import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { authState, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authState) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
