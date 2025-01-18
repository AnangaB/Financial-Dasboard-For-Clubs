import Link from "next/link";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-sky-100">
      <div className="flex justify-between flex-wrap items-center p-6">
        <div className="w-full sm:w-auto flex flex-row justify-between">
          <div className="text-xl sm:text-2xl lg:w-1/4">
            <Link className=" hover:bg-sky-400 p-6" href="/">
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
            <i className="bi bi-list text-5xl"></i>
          </button>
        </div>

        <div
          className={
            dropdownOpen
              ? "flex flex-col	sm:flex-row	justify-end w-full sm:w-1/2 lg:w-2/3 xl:w-1/3"
              : "hidden sm:flex flex-col	sm:flex-row	justify-end w-full sm:w-1/2 lg:w-2/3 xl:w-1/3"
          }
        >
          <div className="text-lg ">
            <Link
              className=" hover:bg-sky-400 h-100 p-6 m-2"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
          </div>
          <div className="text-lg">
            <Link
              className=" hover:bg-sky-400 p-6 m-2"
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
