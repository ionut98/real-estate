import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-100 shadow-sm">
      <div className="flex justify-between items-center w-full h-11 p-2">
        <h1 className="font-bold text-2xl flex flex-wrap">
          <span className="text-yellow-600">Realm</span>
          <span className="text-gray-700">Estate</span>
        </h1>
        <form>
          <input
            type="text"
            className="bg-transparent border-2 rounded-md p-1"
            placeholder="Search"
          />
        </form>
      </div>
    </header>
  );
}
