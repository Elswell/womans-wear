import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useStore from "../context/StoreContext";
import { useRef } from "react";

export const Navbar = () => {
  const { checkout } = useStore();
  const [toggleShop, setToggleShop] = useState(false);
  const parsedTotal = parseInt(checkout?.subtotalPriceV2?.amount, 10);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggleShop(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const shopRef = useRef(null);
  useOutsideAlerter(shopRef);

  return (
    <>
      <nav className="w-full bg-black text-white py-8 ">
        <div className="max-w-[1880px] m-auto px-8 flex justify-between items-center">
          <Link to="/" className="mr-32 text-4xl">
            Elleven
          </Link>
          <ul className="items-center justify-center mob:hidden list-none lg:flex space-x-6 [&>li]:border-b-[1px] [&>li]:border-transparent [&>li]:cursor-pointer">
            <li className="hover:border-primary">HOME</li>
            <li
              className="hover:border-primary"
              onClick={() => setToggleShop(!toggleShop)}
            >
              SHOP
            </li>
            <li className="hover:border-primary">BLOG</li>
            <li className="hover:border-primary">SALE</li>
            <li className="hover:border-primary">CONTACT US</li>
          </ul>
          <div className="mob:hidden lg:flex items-center  space-x-4">
            <p>SIGN IN</p>
            <p>CREATE AN ACCOUNT</p>
            <AiOutlineHeart className="text-[24px]" />
            <Link to="/cart" className="flex items-center">
              <HiOutlineShoppingBag className="text-[24px]" />
              <div className="flex flex-col text-xs">
                <span>Shopping cart</span>
                <span>
                  {parsedTotal} {checkout?.subtotalPriceV2?.currencyCode}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {toggleShop ? (
        <div
          ref={shopRef}
          className="bg-[url('../assets/images/shopmenu.webp')] bg-no-repeat bg-cover bg-center absolute z-50 max-w-[1200px] m-auto left-0 right-0 shadow-lg bg-white flex px-10 py-8 space-x-[100px] "
        >
          <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2">
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
          <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2">
            <li className="text-black text-lg font-medium mb-[16px] border-b-2 border-b-black">
              MENU CATEGORY LIST
            </li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
          <ul className="flex flex-col list-none [&>li]:text-myGray space-y-2">
            <li className="text-black text-lg font-medium mb-[16px] border-b-2 border-b-black">
              MENU CATEGORY LIST
            </li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};
