import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { BACKEND_URL } from '../config/env';

const ProtectedRoutes = ({children}) => {
// include cookies in the request
//make a request to the backend to check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();
  const checkAuth = async () => {
    try {
      const url = `${BACKEND_URL}/api/auth/authorize`
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // include cookies in the request
      }); 
      const data = await response.json();
      console.log("Auth check response:", data);
      setIsAuthenticated(data.success);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // You can return a loading spinner here while checking authentication
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children ? children : <Outlet />;

}

export default ProtectedRoutes