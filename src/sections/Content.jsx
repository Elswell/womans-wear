import React from "react";
import { Container, Button } from "../components/";

export const Content = () => {
  return (
    // <Container>
    <section className="mx-4">
      <div className="w-full flex lg:flex-row mob:flex-col mob:space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
        <div className="flex flex-col space-y-[20px] lg:w-1/2 mob:w-full">
          <div className="w-full h-full bg-[url('../assets/images/choose-your-look.png')] bg-cover bg-no-repeat">
            <div className="flex flex-col w-full h-full items-center justify-center py-12">
              <div className="md:w-1/2 mob:w-full mob:px-4 md:px-0 self-end flex flex-col">
                <h2 className="lg:text-[48px] mob:text-[32px] font-semibold">
                  CHOOSE <br /> YOUR LOOK
                </h2>
                <p className="mb-6">See our clothing collections</p>
                <Button className="self-start">SEE OFFERS</Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-[url('../assets/images/brand-new-style.png')] bg-cover bg-no-repeat">
            <div className="flex flex-col  w-full h-full items-center justify-center  py-12">
              <div className="md:w-1/2 mob:w-full mob:px-4 md:px-0 self-center  flex flex-col">
                <h2 className="text-[48px] font-semibold">
                  BRAND <br /> NEW STYLE
                </h2>
                <p className="mb-6">See our clothing collections</p>
                <Button className="self-start">SEE OFFERS</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mob:w-full lg:w-1/2">
          <div className="w-full h-full bg-[url('../assets/images/sales-image.png')] bg-cover bg-no-repeat">
            <div className="flex flex-col w-full h-full items-center justify-end">
              <div className="md:w-1/2 mob:w-full mob:px-4  self-start p-28 flex flex-col">
                <h2 className="lg:text-[96px] mob:text-[48px] font-semibold">
                  UP TO <br /> 40% OFF
                </h2>
                <p className="mb-6">Special offers and great deals</p>
                <Button className="self-start">SHOP NOW</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // </Container>
  );
};
