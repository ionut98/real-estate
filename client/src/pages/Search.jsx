import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';

const INITIAL_SIDEBAR_DATA = {
  searchTerm: '',
  type: 'all',
  parking: false,
  furnished: false,
  offer: false,
  sort: 'createdAt',
  order: 'desc',
};

const SORT_OPTIONS = {
  PRICE_HIGH_LOW: 'regularPrice_desc',
  PRICE_LOW_HIGH: 'regularPrice_asc',
  LATEST: 'createdAt_desc',
  OLDEST: 'createdAt_asc',
};

export default function Search() {
  const [sidebarData, setSidebarData] = useState(INITIAL_SIDEBAR_DATA);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleChangeData = (ev) => {
    if (['all', 'sale', 'rent'].includes(ev.target.id)) {
      setSidebarData((sd) => ({
        ...sd,
        type: ev.target.id,
      }));
      return;
    }

    if (ev.target.id === 'searchTerm') {
      setSidebarData((sd) => ({
        ...sd,
        searchTerm: ev.target.value,
      }));
      return;
    }

    if (['parking', 'furnished', 'offer'].includes(ev.target.id)) {
      setSidebarData((sd) => ({
        ...sd,
        [ev.target.id]: Boolean(ev.target.checked),
      }));
      return;
    }

    if (ev.target.id === 'sort_order') {
      const [sort, order] = ev.target.value.split('_');
      setSidebarData((sd) => ({
        ...sd,
        sort: sort || 'createdAt',
        order: order || 'desc',
      }));
    }
  };

  useEffect(() => {
    console.log(sidebarData, '<=== SIDEBAR DATA');
  }, [sidebarData]);

  const handleSubmitSearch = (ev) => {
    ev.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get('searchTerm');
    const typeUrl = urlParams.get('type');
    const parkingUrl = urlParams.get('parking');
    const furnishedUrl = urlParams.get('furnished');
    const offerUrl = urlParams.get('offer');
    const sortUrl = urlParams.get('sort');
    const orderUrl = urlParams.get('order');

    if (
      searchTermUrl ||
      typeUrl ||
      parkingUrl ||
      furnishedUrl ||
      offerUrl ||
      sortUrl ||
      orderUrl
    ) {
      setSidebarData({
        searchTerm: searchTermUrl || '',
        type: typeUrl || 'all',
        parking: parkingUrl === 'true' ? true : false,
        furnished: furnishedUrl === 'true' ? true : false,
        offer: offerUrl === 'true' ? true : false,
        sort: sortUrl || 'createdAt',
        order: orderUrl || 'desc',
      });
    }

    getFilteredData();
  }, [location.search]);

  useEffect(() => {
    console.log('<=== LISTINGS', listings);
  }, [listings]);

  const getFilteredData = async () => {
    try {
      console.log('AJUNGE AICI');
      setLoading(true);

      const urlParams = new URLSearchParams(location.search);
      const searchQuery = urlParams.toString();

      const result = await fetch(`api/listing?${searchQuery}`);
      const data = await result.json();
      if (data.success === false) {
        setLoading(false);
        return;
      }

      if (data.length > 8) {
        setShowMore(true);
      }

      setListings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleShowMore = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const result = await fetch(`api/listing?${searchQuery}`);
    const data = await result.json();
    if (data.success === false) {
      return;
    }

    if (data.length < 9) {
      setShowMore(false);
    }

    setListings((prevListings) => [...prevListings, ...data]);
  };

  return (
    <main className="flex flex-col md:flex-row text-gray-700">
      <div className="p-7 border-blue-50 border-b-2 md:border-r-2 md:min-h-[calc(100vh-56px)]">
        <form onSubmit={handleSubmitSearch} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search"
              className="border rounded-lg p-3 w-full outline-none"
              value={sidebarData.searchTerm}
              onChange={handleChangeData}
            />
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">Type:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="all"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">
              Amenities:
            </label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
                onChange={handleChangeData}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-2 focus:outline-none cursor-pointer"
              onChange={handleChangeData}
              value={`${sidebarData.sort}_${sidebarData.order}`}
            >
              <option value={SORT_OPTIONS.PRICE_HIGH_LOW}>
                Price high to low
              </option>
              <option value={SORT_OPTIONS.PRICE_LOW_HIGH}>
                Price low to high
              </option>
              <option value={SORT_OPTIONS.LATEST}>Latest</option>
              <option value={SORT_OPTIONS.OLDEST}>Oldest</option>
            </select>
          </div>
          <button className="bg-gray-700 text-blue-50 w-full hover:opacity-80 p-2 border rounded-lg uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold border-b p-7 text-gray-700 mt-1">
          Listing results:
        </h1>
        <div className="p-7 flex flex-col gap-4 flex-wrap w-full">
          {!loading && listings?.length === 0 && (
            <p className="text-gray-700 flex justify-center w-full">
              No listing found!
            </p>
          )}
          {loading && (
            <p className="text-gray-700 flex justify-center w-full">
              Loading...
            </p>
          )}
          <div className="flex gap-4 flex-wrap">
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
          </div>
          {showMore && (
            <button
              className="text-blue-700 px-7 py-2 w-full text-center mx-auto"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
