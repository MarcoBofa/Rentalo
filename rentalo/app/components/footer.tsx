import React, { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 py-8 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <Link href="/">
            <h3 className="text-3xl font-bold mb-2">TradeIt</h3>
          </Link>
        </div>
        <div className="w-full sm:w-1/3 text-center mb-4 sm:mb-0">
          <div className="flex justify-center mb-2">
            <button className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <span className="text-2xl font-bold">L</span>
            </button>
            <button className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">O</span>
            </button>
          </div>
          <div className="flex justify-center">
            <button className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <span className="text-2xl font-bold">G</span>
            </button>
            <button className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">O</span>
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/3 text-center sm:text-right">
          <p className="mb-2">University of Illinois Chicago</p>
          <p className="mb-2">1200 West Harrison St</p>
          <p className="mb-2">Chicago, IL 60607</p>
          <p className="mb-2">United States of America</p>
        </div>
      </div>
      <div className="w-full text-gray-500 text-center">
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
