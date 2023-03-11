import React from "react";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full px-8 bg-black mt-16 text-white py-8">
      <div className="flex max-w-[1880px] justify-between m-auto [&>ul]:space-y-4">
        <div className="text-[56px] border-b-2 border-white self-start">
          Elleven
        </div>
        <ul className="[&>li]:text-myDarkGray">
          <li className="font-semibold text-lg ">FEATURES</li>
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
        </ul>
        <ul className="[&>li]:text-myDarkGray">
          <li className="font-semibold text-lg [&>li]:text-myDarkGray">
            FEATURES
          </li>
          <li>Category</li>
          <li>Category</li>
          <li>Category</li>
        </ul>
        <ul className="[&>li]:flex [&>li]:items-center [&>li]:space-x-4 [&>li]:text-myDarkGray ">
          <li className="font-semibold text-lg ">FOLLOW US</li>
          <li>
            <AiFillFacebook className="text-[30px]" />
            <span>FACEBOOK</span>
          </li>
          <li>
            <AiFillTwitterSquare className="text-[30px]" />
            <span>TWITTER</span>
          </li>
          <li>
            <FaInstagramSquare className="text-[30px]" />
            <span>INSTAGRAM</span>
          </li>
        </ul>
        <div className="flex flex-col space-y-4">
          <p className="font-semibold text-lg">JOIN US</p>
          <div className="space-y-2">
            <p className="text-myDarkGray uppercase">
              Subscribe to our newsletters
            </p>
            <form className="flex flex-col space-y-4">
              <input
                placeholder="Email Address"
                className="bg-transparent border-2 border-white p-2 placeholder:text-white focus:outline-none"
              />
              <button className="bg-white text-myDarkGray p-2" disabled>
                SUBSCRIBE!
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
