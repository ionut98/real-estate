import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import { RENT_TYPE, SELL_TYPE } from './AddListing';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);

  const { listingId } = useParams();
  const { currentUser: user } = useSelector((state) => state.user);

  const [listingDetails, setListingDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    getListingDetails();
  }, []);

  const getListingDetails = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/listing/${listingId}`);

      const data = await response.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }

      setListingDetails(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleClickContact = () => {
    if (!contact) {
      setContact(true);
    } else {
    }
  };

  return (
    <main>
      {listingDetails && !loading && !error && (
        <Swiper navigation>
          {listingDetails.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[400px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {loading && (
        <p className="text-gray-700 text-3xl font-semibold text-center my-7">
          Loading...
        </p>
      )}
      {error && !loading && (
        <p className="text-red-700 text-center text-xl">
          Something went wrong!
        </p>
      )}
      <div
        onClick={handleClickShare}
        className="fixed top-[12.5%] right-[1.5%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-blue-50 cursor-pointer"
      >
        <FaShare className="text-gray-700" />
      </div>
      {copied && (
        <p className="fixed top-[22%] right-[1.5%] z-10 rounded-lg items-center bg-blue-50 p-2">
          Copied!
        </p>
      )}
      {listingDetails && (
        <div className="text-gray-700 flex flex-col max-w-4xl mx-auto px-3 my-5 gap-4">
          <p className="text-2xl font-semibold">
            <span className="mr-2">{listingDetails.name} </span>
            <span
              className={`text-2xl font-semibold ${
                listingDetails.offer ? 'text-red-700' : ''
              }`}
            >
              $
              {listingDetails.offer
                ? listingDetails.discountedPrice.toLocaleString('en-US')
                : listingDetails.regularPrice.toLocaleString('en-US')}
              {listingDetails.type === 'rent' && ' / month'}
            </span>
          </p>
          <p className="flex gap-2 items-center text-lg font-normal">
            <FaMapMarkerAlt className="text-blue-700" />
            {listingDetails.address}
          </p>
          <div className="flex gap-3">
            <p className="border bg-blue-700 w-full max-w-[200px] text-blue-50 text-center p-1 rounded-lg">
              {listingDetails.type === SELL_TYPE
                ? 'For sale'
                : listingDetails.type === RENT_TYPE
                ? 'For rent'
                : ''}
            </p>
            {listingDetails.offer && (
              <p className="border bg-red-700 w-full max-w-[200px] text-blue-50 text-center p-1 rounded-lg">
                -
                {((+listingDetails.regularPrice -
                  +listingDetails.discountedPrice) /
                  +listingDetails.regularPrice) *
                  100}
                %
              </p>
            )}
          </div>
          <p className="text-gray-700 text-md text-justify">
            {listingDetails.description}
          </p>
          <ul className="text-blue-700 font-semibold text-sm flex gap-4 flex-wrap">
            <li className="flex items-center gap-1 border border-blue-700 px-2 py-1 rounded-xl whitespace-nowrap">
              <FaBed className="text-md" />
              {listingDetails.bedrooms > 1
                ? `${listingDetails.bedrooms} bedrooms`
                : `${listingDetails.bedrooms} bedroom`}
            </li>
            <li className="flex items-center gap-1 border border-blue-700 px-2 py-1 rounded-xl whitespace-nowrap">
              <FaBath className="text-md" />
              {listingDetails.bathrooms > 1
                ? `${listingDetails.bathrooms} bathrooms`
                : `${listingDetails.bathrooms} bathroom`}
            </li>
            <li className="flex items-center gap-1 border border-blue-700 px-2 py-1 rounded-xl whitespace-nowrap">
              <FaParking className="text-md" />
              {listingDetails.parking ? `Parking spot` : `No Parking`}
            </li>
            <li className="flex items-center gap-1 border border-blue-700 px-2 py-1 rounded-xl whitespace-nowrap">
              <FaChair className="text-md" />
              {listingDetails.furnished ? `Furnished` : `Unfurnished`}
            </li>
          </ul>
          {user && listingDetails.userRef !== user?._id && !contact && (
            <button
              onClick={handleClickContact}
              className="bg-gray-700 text-blue-50 rounded-lg p-2 mt-4 uppercase hover:opacity-80"
            >
              Contact landlord
            </button>
          )}
          {contact && <Contact listing={listingDetails} />}
        </div>
      )}
    </main>
  );
}
