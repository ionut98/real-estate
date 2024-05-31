import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          className="border text-md p-2 rounded-lg outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border text-md p-2 rounded-lg outline-none"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border text-md p-2 rounded-lg outline-none"
          id="password"
        />
        <button className="bg-blue-700 rounded-lg p-2 my-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p className="text-gray-700">Have an account?</p>
        <Link to={'/login'}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
}
