import Link from "next/link";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-sky-100 p-3">
      <div className="flex justify-between flex-wrap items-center">
        <div className="w-full sm:w-auto flex flex-row items-center justify-between">
          <div className="text-xl sm:text-2xl md:w-full">
            <Link className=" hover:text-red-700 p-2" href="/">
              <span>Finances Visualizer</span>
            </Link>
          </div>

          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="sm:hidden"
            type="button"
            onClick={toggleDropdown}
          >
            <i className="bi bi-list hover:text-red-700  text-5xl"></i>
          </button>
        </div>
        <div
          className={`flex flex-col sm:flex-row justify-end w-full sm:w-1/2 lg:w-2/3 xl:w-1/3 transition-all duration-500 ease-out ${
            dropdownOpen
              ? "max-h-screen opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none sm:max-h-screen sm:opacity-100 sm:pointer-events-auto"
          } overflow-hidden`}
        >
          <div className="text-lg ">
            <Link
              className=" hover:text-red-700 m-2"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
          </div>
          <div className="text-lg">
            <Link
              className="hover:text-red-700  m-2"
              href="/table"
              aria-current="page"
            >
              Data Table
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
