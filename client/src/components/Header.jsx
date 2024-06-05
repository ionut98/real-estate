import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import logo from '../assets/logo.png';

export default function Header() {
  const { currentUser: user } = useSelector((state) => state.user);

  console.log(user, '<=== USER');

  return (
    <header className="bg-blue-50 shadow-sm">
      <div className="flex justify-between items-center w-full p-2 px-3">
        <Link to={'/'}>
          <h1 className="font-bold text-2xl flex flex-wrap">
            <img src={logo} alt="logo" className="h-12" draggable={false} />
          </h1>
        </Link>

        <form className="bg-white py-2 px-3 rounded-lg flex flex-wrap items-center">
          <input
            type="text"
            className="bg-transparent focus:outline-none w-32 sm:w-64 md:w-72 lg:w-96"
            placeholder="Search"
          />
          <FaSearch className="text-gray-700" />
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
