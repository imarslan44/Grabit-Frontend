import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { BACKEND_URL } from '../config/env';

const ProtectedRoutes = ({children}) => {
const [isAuthorized, setIsAuthorized] = useState(true);

const {user} = useSelector((state)=> state.auth);
const location = useLocation();

const authorizeUser = async ()=>{
  
  const url = `${BACKEND_URL}/api/auth/authorize`
  const response = await fetch(url, {
    credentials: "include"});

  const data =  await response.json();
  console.log(data.success)
  if(!data.success) return setIsAuthorized(false);
  setIsAuthorized(true)
}
useEffect(() => {
   authorizeUser()
   console.log(isAuthorized)
}, [])

  if(!isAuthorized) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return <Outlet/>
}

export default ProtectedRoutes