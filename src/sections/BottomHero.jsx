import React from "react";
import { Button } from "../components/";

export const BottomHero = () => {
  return (
    <div className="mob:py-8 lg:py-16 px-8 mx-4 mt-4 h-full mob:bg-blue-200 md:bg-[url('../assets/images/bottom-hero.webp')] bg-no-repeat bg-cover bg-center">
      <div className="max-w-[1440px] m-auto flex flex-col space-y-6 h-full ">
        <div className="flex flex-col space-y-6 relative mob:px-2 md:px-8 mob:text-center md:text-left mob:items-center md:items-start">
          <div className="absolute border-t-2 border-r-2 border-black w-1/2 h-[100px] left-14 top-6 mob:hidden "></div>
          <h2 className="lg:text-[56px] mob:text-[32px] font-semibold">
            SHOPPING WITHOUT LIMITS
          </h2>
          <p className="max-w-[600px]">
            You can choose the best option for you, and it does not matter
            whether you are in Prague or San Francisco. We will deliver your
            purchase anywhere!
          </p>
          <Button variant="primary" className="lg:self-start mob:self-center">
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  );
};
