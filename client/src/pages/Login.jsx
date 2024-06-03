import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/user/userSlice';

export default function Login() {
  const [formData, setFormData] = useState({});
  const { error, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setFormData((fd) => ({
      ...fd,
      [event.target.id]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginStart);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      } else {
        dispatch(loginSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Login
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border text-md p-2 rounded-lg outline-none"
          id="email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border text-md p-2 rounded-lg outline-none"
          id="password"
          onChange={handleInputChange}
        />
        <button
          disabled={isLoading}
          className="bg-blue-700 rounded-lg p-2 my-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p className="text-gray-700">{"Don't have an account?"}</p>
        <Link to={'/sign-up'}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-4">{error}</p>}
    </div>
  );
}
