import React from "react";
import { CarouselP } from "./CarouselP";
import { useStaticQuery, graphql } from "gatsby";
import FetchFeaturedItems from "../hooks/FetchFeaturedItems";

export const ProductsCarousel = () => {
  return (
    <section className="mx-4 my-20">
      <FetchFeaturedItems />
    </section>
  );
};
