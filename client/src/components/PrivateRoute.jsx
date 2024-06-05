import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser: user } = useSelector((state) => state.user);

  if (user) {
    return <Outlet />;
  }

  return <div>PrivateRoute</div>;
}
