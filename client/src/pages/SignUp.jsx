import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData((fd) => ({
      ...fd,
      [event.target.id]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border text-md p-2 rounded-lg outline-none"
          id="username"
          onChange={handleInputChange}
        />
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
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2">
        <p className="text-gray-700">Already have an account?</p>
        <Link to={'/login'}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-4">{error}</p>}
    </div>
  );
}
