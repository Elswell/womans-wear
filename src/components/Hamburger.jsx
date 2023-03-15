import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import { GrClose } from "react-icons/gr";

export const Hamburger = ({ closeHamburger }) => {
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeHamburger();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const hamburgerRef = useRef(null);
  useOutsideAlerter(hamburgerRef);

  return (
    <div
      ref={hamburgerRef}
      className="h-1/3 w-full bg-gray-100 absolute top-0 z-10 flex items-center px-4 space-x-8"
    >
      <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2 w-1/3 ">
        <li className="text-black text-lg font-medium mb-[16px] border-b-2 border-b-black">
          CLOTHING
        </li>
        <li>
          <Link to="/collection/summer">SUMMER</Link>
        </li>
        <li>
          <Link to="/collection/active-wear">ACTIVEWEAR</Link>
        </li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
      </ul>
      <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2 w-1/3 ">
        <li className="text-black text-lg font-medium mb-[16px] border-b-2 border-b-black">
          MENU CATEGORY LIST
        </li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
      </ul>
      <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2 w-1/3">
        <li className="text-black text-lg font-medium mb-[16px] border-b-2 border-b-black">
          MENU CATEGORY LIST
        </li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
        <li>Link</li>
      </ul>
      <button
        className="absolute right-4 top-4 text-2xl"
        onClick={() => closeHamburger()}
      >
        <GrClose />
      </button>
    </div>
  );
};
