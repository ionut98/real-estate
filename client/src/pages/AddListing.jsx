import React from 'react';

export default function AddListing() {
  return (
    <main className="max-w-2xl mx-auto p-3">
      <h1 className="text-gray-700 text-3xl font-semibold text-center my-7">
        Add Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 text-gray-700">
        <div className="flex flex-col gap-2 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border text-md p-2 rounded-lg outline-none"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border text-md p-2 rounded-lg outline-none"
            id="description"
            style={{ minBlockSize: '60px', maxBlockSize: '200px' }}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border text-md p-2 rounded-lg outline-none"
            id="address"
            required
          />
          <div className="flex gap-4 flex-wrap p-1 my-2">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5 cursor-pointer" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 cursor-pointer" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="beds"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-16"
                  min={1}
                  max={10}
                  required
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="baths"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-16"
                  min={1}
                  max={10}
                />
                <p>Baths</p>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 my-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-28"
                  min={1}
                  max={100000000}
                />
                <div className="flex flex-col items-start">
                  <p>Regular price</p>
                  <span className="text-xs">{`($ / month)`}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-2 border border-gray-300 rounded-lg outline-none w-28"
                  min={1}
                  max={100000000}
                />
                <div className="flex flex-col items-start">
                  <p>Discounted price</p>
                  <span className="text-xs">{`($ / month)`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-semibold text-gray-700">
            Images:
            <span className="font-normal ml-2 text-sm">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              className="p-2 border border-gray-300 rounded-lg outline-none cursor-pointer w-full"
              multiple
            />
            <button
              disabled
              className="p-2 font-semibold text-blue-700 rounded-lg border border-blue-700 uppercase hover:shadow-lg disabled:opacity-65 cursor-pointer"
            >
              Upload
            </button>
          </div>
          <button className="text-gray-50 bg-gray-700 p-2 rounded-lg font-semibold uppercase my-4">
            Add Listing
          </button>
        </div>
      </form>
    </main>
  );
}
