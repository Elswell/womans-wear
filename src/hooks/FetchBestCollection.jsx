import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ProductCard } from "../components/ProductCard";

const getBest = graphql`
  {
    shopifyCollection(title: { eq: "Best Sellers" }) {
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

const FetchBestCollection = () => {
  const data = useStaticQuery(getBest);

  return (
    <>
      {data.shopifyCollection.products.slice(0, 8).map((data, i) => (
        <ProductCard {...data} key={i} />
      ))}
    </>
  );
};

export default FetchBestCollection;
