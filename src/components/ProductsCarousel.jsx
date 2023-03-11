import React from "react";
import FetchFeaturedItems from "../hooks/FetchFeaturedItems";

export const ProductsCarousel = () => {
  return (
    <section className="mx-4 my-20">
      <FetchFeaturedItems />
    </section>
  );
};
