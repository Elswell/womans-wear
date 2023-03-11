import React from "react";
import { ProductCard, Button } from "../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group absolute top-0 right-8 space-x-2 text-myLightGray flex">
      <button
        className="border-2 border-myLightGray hover:border-myDarkGray hover:text-myGray p-1 text-2xl"
        onClick={() => previous()}
        disabled={currentSlide === 0 ? true : false}
      >
        <BiChevronLeft />
      </button>
      <button
        className="border-2 border-myLightGray hover:border-myDarkGray hover:text-myGray p-1 text-2xl"
        onClick={() => next()}
      >
        <BiChevronRight />
      </button>
    </div>
  );
};

export const CarouselP = ({ data, tag }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 5,
    },
    smDesktop: {
      breakpoint: { max: 1800, min: 1440 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1440, min: 100 },
      items: 3,
    },
    smTablet: {
      breakpoint: { max: 1000, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="max-w-[1880px] m-auto relative">
        <div>
          <p className="text-2xl">{tag}</p>
        </div>
        <Carousel
          responsive={responsive}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          arrows={false}
          showDots={false}
          swipeable={false}
          ssr={true}
          className="mt-8"
          itemClass="flex justify-center"
        >
          {data.map((data, i) => (
            <ProductCard {...data} key={i} />
          ))}
        </Carousel>
      </div>
    </>
  );
};
