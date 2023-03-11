import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ProductCard } from "../components/ProductCard";

const getTrending = graphql`
  {
    shopifyCollection(title: { eq: "Trending" }) {
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

const FetchTrendingCollection = () => {
  const data = useStaticQuery(getTrending);

  if (!data) {
    return <pre>No data</pre>;
  }

  return (
    <>
      {data.shopifyCollection.products.slice(0, 8).map((data, i) => (
        <ProductCard {...data} key={i} />
      ))}
    </>
  );
};

export default FetchTrendingCollection;
