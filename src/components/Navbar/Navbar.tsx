import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="flex justify-between flex-wrap items-center p-8">
        <div className="w-full text-2xl sm:w-1/2 lg:w-1/4">
          <Link className=" hover:bg-sky-400 p-6" href="/">
            <span>Finances Visualizer</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-end w-full sm:w-1/2 lg:w-2/3 xl:w-1/3">
          <div className="w-full text-lg sm:w-1/2 md:w-1/2 lg:w-1/3">
            <Link
              className=" hover:bg-sky-400 h-100 p-6"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
          </div>
          <div className="w-full text-lg sm:w-1/2 md:w-1/2 lg:w-1/3">
            <Link
              className=" hover:bg-sky-400 p-6"
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
