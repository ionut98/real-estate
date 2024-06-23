import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import logo from '../assets/logo.png';

export default function Header() {
  const { currentUser: user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log(user, '<=== USER');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    if (!searchTerm && urlParams.has('searchTerm')) {
      urlParams.delete('searchTerm');
    } else {
      urlParams.set('searchTerm', searchTerm);
    }

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-blue-50 shadow-sm">
      <div className="flex justify-between items-center w-full p-2 px-3">
        <Link to={'/'}>
          <h1 className="font-bold text-2xl flex flex-wrap">
            <img
              src={logo}
              alt="logo"
              className="h-8 sm:h-10"
              draggable={false}
            />
          </h1>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="bg-white py-2 px-3 rounded-lg flex flex-wrap items-center"
        >
          <input
            type="text"
            className="bg-transparent focus:outline-none w-32 sm:w-64 md:w-72 lg:w-96"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch
            onClick={handleSearchSubmit}
            className="text-gray-700 cursor-pointer"
          />
        </form>

        <ul className="flex gap-4 items-center">
          <Link to={'/'}>
            <li className="text-gray-700 font-semibold hidden sm:inline hover:text-blue-700 hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={'/about'}>
            <li className="text-gray-700 font-semibold hidden sm:inline hover:text-blue-700 hover:cursor-pointer">
              About
            </li>
          </Link>
          {!user ? (
            <Link to={'/login'}>
              <li className="text-gray-700 font-semibold sm:inline hover:text-blue-700 hover:cursor-pointer">
                Login
              </li>
            </Link>
          ) : (
            <Link to={'/profile'}>
              <li>
                <img
                  src={user.avatar}
                  alt="profile-avatar"
                  className="rounded-full h-9 w-9 object-cover"
                  referrerPolicy="no-referrer"
                />
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
