import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css/bundle';
import { FaShare } from 'react-icons/fa';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();

  const [listingDetails, setListingDetails] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <main>
      {listingDetails && !loading && !error && (
        <Swiper navigation>
          {listingDetails.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
          <div className="fixed top-[12.5%] right-[1.5%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-blue-50 cursor-pointer">
            <FaShare className="text-gray-700" onClick={handleClickShare} />
          </div>
          {copied && (
            <p className="fixed top-[22%] right-[1.5%] z-10 rounded-lg items-center bg-blue-50 p-2">
              Copied!
            </p>
          )}
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
    </main>
  );
}
