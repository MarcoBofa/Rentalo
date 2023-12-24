"use client";
import { useContext } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { safeUser } from "@/types";
import UserContext from "../../context/useContext";

import Link from "next/link";
import Image from "next/image";

interface navbarPros {
  currentUser?: safeUser | null;
}

const NavbarAzienda: React.FC<navbarPros> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 navbar-background bg-gray-900 text-white py-4 px-1 lg:px-6">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold flex items-center">
          <Image width={50} height={50} src="/logo-o.png" alt="Rentalo Logo" />{" "}
          Rentalo
        </Link>
        <div className="relative">
          <div
            className="rounded-full text-xl bg-gray-700 px-3 py-1 flex items-center cursor-pointer"
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
              className="absolute z-10  w-[300px] py-2 bg-gray-900 text-white rounded shadow-xl"
              style={{
                top: 70, // Directly below the navbar
                left: -110, // Aligned with the right edge of the viewport
              }}
            >
              {currentUser ? (
                <>
                  <Link
                    href="/"
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
                    Noleggi
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Annunci
                  </Link>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/Impostazioni"
                    className="block px-4 py-2 hover:bg-gray-800"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Impostazioni
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
                    href="/ScegliUtente"
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

export default NavbarAzienda;
