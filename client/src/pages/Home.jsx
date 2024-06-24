import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    fetchOfferListings();
    fetchSaleListings();
    fetchRentListings();
  }, []);

  const fetchOfferListings = async () => {
    try {
      const res = await fetch('/api/listing?offer=true&limit=3');
      const data = await res.json();

      if (data.success === false) {
        return;
      }

      setOfferListings(data);
    } catch (error) {}
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch('/api/listing?type=sale&limit=3');
      const data = await res.json();

      if (data.success === false) {
        return;
      }

      setSaleListings(data);
    } catch (error) {}
  };

  const fetchRentListings = async () => {
    try {
      const res = await fetch('/api/listing?type=rent&limit=3');
      const data = await res.json();

      if (data.success === false) {
        return;
      }

      setRentListings(data);
    } catch (error) {}
  };

  return (
    <main>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-gray-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-blue-600">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Realm Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className="text-xs sm:text-sm text-blue-600 font-bold mt-2"
        >
          Let's get started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className="h-[500px]"
                key={listing._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-600 "
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Recent places for sale
              </h2>
              <Link className="text-sm text-blue-600 " to={'/search?type=sale'}>
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Places for rent
              </h2>
              <Link className="text-sm text-blue-600 " to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
