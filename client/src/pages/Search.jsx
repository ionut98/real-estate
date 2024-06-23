import React from 'react';

export default function Search() {
  return (
    <main className="flex flex-col md:flex-row">
      <div className="p-7 border-gray-300 border-b-2 md:border-r-2 md:min-h-screen">
        <form>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full outline-none"
            />
          </div>
        </form>
      </div>
      <div className="">
        <h1>Listing results:</h1>
      </div>
    </main>
  );
}
