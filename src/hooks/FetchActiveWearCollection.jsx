import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ProductCard } from "../components/ProductCard";

const getActiveWear = graphql`
  {
    shopifyCollection(title: { eq: "Active Wear" }) {
      products {
        id
        title
        handle
        descriptionHtml
        tags
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

const FetchActiveWearCollection = () => {
  const data = useStaticQuery(getActiveWear);

  return (
    <>
      {data.shopifyCollection.products.slice(0, 8).map((data, i) => (
        <ProductCard {...data} key={i} />
      ))}
    </>
  );
};

export default FetchActiveWearCollection;
