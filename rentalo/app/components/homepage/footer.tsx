import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 py-8 px-4 px-1 lg:px-8 text-gray-300">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-1/3 text-left">
          <Link
            href="/"
            className=" text-xl lg:text-3xl font-bold flex items-center"
          >
            <Image
              width={48}
              height={48}
              src="/logo-o.png"
              alt="Rentalo Logo"
              className="mr-1 color: white mb-1 mr-1"
            />{" "}
            Rentalo
          </Link>
        </div>
        <div className="w-1/3 text-center mb-4 mb-0">
          <div className="flex justify-center mb-2">
            <button className="bg-gray-700 w-[25px] lg:w-[32px] h-[25px] lg:h-[32px] rounded-full flex items-center justify-center mr-2">
              <FaFacebookF />
            </button>
            <button className="bg-gray-700  w-[25px] lg:w-[32px] h-[25px] lg:h-[32px] rounded-full flex items-center justify-center">
              <FaTwitter />
            </button>
          </div>
          <div className="flex justify-center">
            <button className="bg-gray-700  w-[25px] lg:w-[32px] h-[25px] lg:h-[32px] rounded-full flex items-center justify-center mr-2">
              <FaInstagram />
            </button>
            <button className="bg-gray-700 w-[25px] lg:w-[32px] h-[25px] lg:h-[32px] rounded-full flex items-center justify-center">
              <FaLinkedinIn />
            </button>
          </div>
        </div>
        <div className="w-1/3 text-xs lg:text-base text-right">
          <p className="mb-2">Rentalo</p>
          <p className="mb-2">Via Bella 35</p>
          <p className="mb-2">Milano, MI 20149</p>
          <p className="mb-2">Italia</p>
        </div>
      </div>
      <div className="w-full text-sm lg:text-base text-gray-500 text-center">
        <p>
          © 2023 All rights reserved -{" "}
          <Link href="/" className="text-gray-500 hover:text-gray-100">
            Legal Notes
          </Link>{" "}
          -{" "}
          <Link href="/" className="text-gray-500 hover:text-gray-100">
            Privacy Policy
          </Link>{" "}
          -{" "}
          <Link href="/" className="text-gray-500 hover:text-gray-100">
            General Terms of Use
          </Link>{" "}
          -{" "}
          <Link href="/" className="text-gray-500 hover:text-gray-100">
            Cookie Management
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
