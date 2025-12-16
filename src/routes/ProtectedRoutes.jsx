import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
const {user} = useSelector((state)=> state.auth);
console.log("user:", user)
const location = useLocation();

  if(!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return <Outlet/>
}

export default ProtectedRoutes