import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { CarouselP } from "../components/CarouselP";

const getFeatured = graphql`
  {
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
`;

const FetchFeaturedItems = () => {
  const data = useStaticQuery(getFeatured);

  return (
    <>
      <CarouselP data={data.allShopifyProduct.nodes} tag="Featured Items" />
    </>
  );
};

export default FetchFeaturedItems;
