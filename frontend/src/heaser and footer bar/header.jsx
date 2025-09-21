import React, { useState } from "react";
import logo from "../img/logo.jpeg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 fixed w-full z-10 top-0 left-0 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-14 rounded-md object-cover"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <a
              href="/"
              className="hover:text-blue-500 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#courses"
              className="hover:text-blue-500 transition"
            >
              Explore Courses
            </a>
          </li>
          <li>
            <a
              href="#community"
              className="hover:text-blue-500 transition"
            >
              Track Progress
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 py-4 px-6 font-medium">
            <li>
              <a
                href="/"
                className="hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#courses"
                className="hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Explore Courses
              </a>
            </li>
            <li>
              <a
                href="#community"
                className="hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Track Progress
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
