import { useNavigate } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { RENT_TYPE } from '../pages/AddListing';

export default function ListingCard({ listing }) {
  const navigate = useNavigate();

  const navigateToListing = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div
      onClick={navigateToListing}
      className="text-gray-700 cursor-pointer bg-gray-50 shadow-sm hover:shadow-lg transition-shadow duration-500 overflow-hidden rounded-lg w-full sm:w-[304px]"
    >
      <img
        src={listing.imageUrls[0]}
        alt={`${listing.name} photo`}
        className="h-[320px] sm:h-[160px] w-full object-cover hover:scale-105 duration-500"
      />
      <div className="p-3 flex flex-col gap-2">
        <p className="truncate text-lg font-semibold">{listing.name}</p>
        <div className="flex items-center text-xs gap-1">
          <MdLocationOn className="text-blue-700" />
          <p className="truncate">{listing.address}</p>
        </div>
        <p className="text-sm line-clamp-2 mt-1">{listing.description}</p>
      </div>
      <div className="flex gap-2 text-xs px-3 text-gray-700 font-semibold">
        <div className="flex items-center whitespace-nowrap">
          {listing.bedrooms > 1
            ? `${listing.bedrooms} beds`
            : `${listing.bedrooms} bed`}
        </div>
        <div className="flex items-center whitespace-nowrap">
          {listing.bathrooms > 1
            ? `${listing.bathrooms} baths`
            : `${listing.bathrooms} bath`}
        </div>
      </div>
      <p
        className={`p-3 flex gap-2 font-semibold items-center justify-between ${
          listing.offer ? 'text-red-700' : ''
        }`}
      >
        $
        {listing.offer
          ? listing.discountedPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}
        {listing.type === RENT_TYPE ? '/month' : ''}
        {listing.offer && (
          <span className="border bg-red-700 text-gray-50 text-center px-2 rounded-lg">
            -
            {Math.floor(
              ((+listing.regularPrice - +listing.discountedPrice) /
                +listing.regularPrice) *
                100
            )}
            %
          </span>
        )}
      </p>
    </div>
  );
}
