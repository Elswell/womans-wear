import React from "react";
import { CarouselP } from "./CarouselP";
import { useStaticQuery, graphql } from "gatsby";

export const ProductsCarousel = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyProduct(filter: { tags: { eq: "Featured Items" } }) {
        nodes {
          title
          handle
          collections {
            title
          }
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            gatsbyImageData
          }
        }
      }
    }
  `);

  const featuredItems = data.allShopifyProduct.nodes;

  return (
    <section className="mx-4 my-20">
      {featuredItems ? (
        <CarouselP data={featuredItems} tag="Featured Items" />
      ) : null}
    </section>
  );
};
