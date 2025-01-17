import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="m-1">
      <div className="flex p-7 justify-around">
        <Link href="/">
          <span>Finances Visualizer</span>
        </Link>
        <div className="flex justify-around w-1/2">
          <Link href="/" aria-current="page">
            Home
          </Link>

          <Link href="/table" aria-current="page">
            Data Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
