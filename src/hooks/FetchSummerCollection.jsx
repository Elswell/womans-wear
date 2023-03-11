import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ProductCard } from "../components/ProductCard";

const getSummer = graphql`
  {
    shopifyCollection(title: { eq: "Summer" }) {
      products {
        id
        title
        handle
        descriptionHtml
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

const FetchSummerColection = () => {
  const data = useStaticQuery(getSummer);

  return (
    <>
      {data.shopifyCollection.products.slice(0, 8).map((data, i) => (
        <ProductCard {...data} key={i} />
      ))}
    </>
  );
};

export default FetchSummerColection;
