import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downProfile, setDownProfile] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleProfile = () => setDownProfile(!downProfile);

  return (
    <div className="bg-[var(--Light)]">
      <div className="flex justify-between items-baseline py-5 px-5">
        <NavLink to="/">
          <h1 className="text-3xl font-bold text-black">
            Women<span className="text-[var(--Pink)]">Power</span>
          </h1>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden h-full gap-12 lg:flex">
          <NavLink
            to="/"
            className="text-lg cursor-pointer pb-1.5 transition-all hover:font-bold text-[var(--Pink)]"
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/Collection"
            className="text-lg cursor-pointer pb-1.5 transition-all hover:font-bold text-[var(--Pink)]"
          >
            <li>Collection</li>
          </NavLink>
          <NavLink
            to="/About"
            className="text-lg cursor-pointer pb-1.5 transition-all hover:font-bold text-[var(--Pink)]"
          >
            <li>About</li>
          </NavLink>
          <NavLink
            to="/Training"
            className="text-lg cursor-pointer pb-1.5 transition-all hover:font-bold text-[var(--Pink)]"
          >
            <li>Trainers</li>
          </NavLink>
          <NavLink
            to="/Contact"
            className="text-lg cursor-pointer pb-1.5 transition-all hover:font-bold text-[var(--Pink)]"
          >
            <li>Contact</li>
          </NavLink>
        </ul>

        <div className="flex gap-2 items-baseline">
          {/* Cart Icon */}
          <div>
            <NavLink to="/Cart">
              <button
                type="button"
                className="text-lg cursor-pointer pb-1.5 transition-all px-2 hover:font-bold font-serif"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </NavLink>
          </div>

          {/* Profile Icon for Small Screens */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-lg cursor-pointer pb-1.5 transition-all px-2 hover:font-bold"
              onClick={toggleProfile}
            >
              <i className="fas fa-user"></i>
            </button>
          </div>

          {/* Menu Button for Small Screens */}
          <div className="inline-block cursor-pointer lg:hidden font-bold text-lg pr-3">
            <button
              onClick={toggleDropdown}
              className="text-[var(--Pink)] font-bold text-xl inline-flex items-center hover:scale-105 transition-all cursor-pointer"
              type="button"
            >
              Menu
            </button>

            {/* Mobile Menu */}
            {dropdownOpen && (
              <div
                id="dropdown"
                className="fixed z-20 divide-y divide-gray-100 rounded-md shadow bg-[var(--Light)]"
              >
                <ul className="py-2 text-sm">
                  <NavLink to="/" className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">
                    <li>Home</li>
                  </NavLink>
                  <NavLink
                    to="/Collection"
                    className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800"
                  >
                    <li>Collection</li>
                  </NavLink>
                  <NavLink to="/About" className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">
                    <li>About</li>
                  </NavLink>
                  <NavLink
                    to="/Training"
                    className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800"
                  >
                    <li>Trainers</li>
                  </NavLink>
                  <NavLink
                    to="/Contact"
                    className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800"
                  >
                    <li>Contact</li>
                  </NavLink>
                  <hr />
                </ul>
              </div>
            )}

            {/* Profile Dropdown for Small Screens */}
            {downProfile && (
              <div
                id="drop"
                className="fixed z-20 divide-y divide-gray-100 rounded-md shadow bg-[var(--Light)]"
              >
                <ul className="py-2 text-sm">
                  <li className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">My Profile</li>
                  <li className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">My Orders</li>
                  <li className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">Log Out</li>
                  <hr />
                </ul>
              </div>
            )}
          </div>

          {/* Profile Dropdown for Large Screens */}
          <div className="hidden lg:block">
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="text-lg cursor-pointer pb-1.5 transition-all px-2 hover:font-bold"
              >
                <i className="fas fa-user"></i>
              </button>

              {downProfile && (
                <div
                  id="drop"
                  className="absolute top-full right-0 z-20 divide-y divide-gray-100 rounded-md shadow bg-[var(--Light)]"
                >
                  <ul className="py-2 text-sm">
                    <li className="block  px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">My Profile</li>
                    <li className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">My Orders</li>
                    <li className="block px-2 text-[var(--Brown)] py-2 hover:text-yellow-800">Log Out</li>
                    <hr />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
