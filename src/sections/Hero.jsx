import React from "react";
import { Button } from "../components/";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export const Hero = () => {
  return (
    <div className="relative h-[800px] bg-[url('../assets/images/hero3.png')] bg-no-repeat bg-cover bg-center m-4 px-4">
      <div className="max-w-[1440px] m-auto flex items-center h-full">
        <div className="flex flex-col space-y-6 relative mob:text-center md:text-left w-full">
          <div className="mob:hidden absolute border-t-2 border-r-2 border-black w-1/3 h-[100px] left-14 top-6"></div>
          <h2 className="md:text-[56px] lg:text-[86px] mob:text-[32px] font-semibold">
            SUMMER SALE <br className="mob:hidden lg:block" /> GET
            <span> 30% OFF</span>
            <br /> ON ALL DRESS
          </h2>
          <Button variant="primary" className="md:self-start mob:self-center">
            SHOP NOW
          </Button>
        </div>
      </div>
      <div className="absolute md:flex bottom-4 right-4 space-x-1 mob:hidden">
        <div className="p-4 bg-black text-white cursor-pointer">
          <BsChevronLeft />
        </div>
        <div className="p-4 bg-black text-white cursor-pointer">
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
};
