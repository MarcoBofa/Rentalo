"use client";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { safeUser } from "@/types";
import Image from "next/image";
import navbarsvg from "../../public/navbar.svg";

import Link from "next/link";

interface navbarPros {
  currentUser?: safeUser | null;
}

const Navbar: React.FC<navbarPros> = ({ currentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rightOffset = `calc(100vw - 100% - ${1500}px)`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 navbar-background bg-gray-900 text-white py-4 px-6">
      <div className="mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="lg:text-4xl sm:text-2xl font-bold flex ml-10 items-center"
        >
          <Image
            width={55}
            height={55}
            src="/logo-o.png"
            alt="Rentalo Logo"
            className="mb-1 mr-1"
          />{" "}
          Rentalo
        </Link>
        <div className="relative mr-10 ">
          <div
            className="rounded-full text-xl bg-gray-800 px-3 py-1 flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="ml-2">
              {currentUser ? `${currentUser.name}` : "Login"}
            </span>
            <div style={{ marginRight: "-8px" }}>
              <Hamburger
                toggled={dropdownOpen}
                toggle={setDropdownOpen}
                size={20}
              />
            </div>
          </div>
          {dropdownOpen && (
            <div
              className="absolute z-10 -right-10 w-[300px] py-2 bg-gray-900 text-white rounded shadow-xl"
              style={{
                top: 70, // Directly below the navbar
                left: -114, // Aligned with the right edge of the viewport
              }}
            >
              <Link href="/Login" className="block px-4 py-2 hover:bg-gray-800">
                Login
              </Link>
              <Link
                href="/ScegliUtente"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
