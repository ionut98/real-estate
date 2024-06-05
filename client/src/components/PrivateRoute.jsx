import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser: user } = useSelector((state) => state.user);

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
