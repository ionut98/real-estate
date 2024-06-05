import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser: user } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-2">
        <img
          src={user.avatar}
          alt="profile-avatar"
          referrerPolicy="no-referrer"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mb-2"
        />
        <input
          type="text"
          placeholder="username"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <input
          type="email"
          placeholder="email"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="password"
          className="border text-md p-2 rounded-lg outline-none"
        />
        <button className="bg-blue-700 rounded-lg p-2 my-2 text-blue-50 font-semibold uppercase hover:opacity-85 disabled:opacity-65">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
