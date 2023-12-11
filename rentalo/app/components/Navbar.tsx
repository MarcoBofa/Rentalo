"use client";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
//import { signOut } from "next-auth/react";

import Link from "next/link";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const signOut = async () => {
    //await signOut();
    setDropdownOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white py-4 px-6 w-full">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold">TradeIt</div>
        </Link>
        <div className="relative">
          <div
            className="rounded-full text-xl bg-gray-800 px-3 py-1 flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="ml-2">{false ? `ciao` : "Login"}</span>
            <div style={{ marginRight: "-8px" }}>
              <Hamburger
                toggled={dropdownOpen}
                toggle={setDropdownOpen}
                size={20}
              />
            </div>
          </div>
          {dropdownOpen && (
            <div className="absolute z-10 right-0 mt-2 w-48 py-2 bg-gray-900 text-white rounded shadow-xl">
              {false ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Home
                  </Link>
                  <a
                    onClick={() => signOut()}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/Login"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    href="/Register"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
