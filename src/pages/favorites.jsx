import React from "react";
import useStore from "../context/StoreContext";
import { Container, Layout, ProductCard } from "../components";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";

const Favorites = () => {
  const { favorites } = useStore();
  const [items, setItems] = useState();

  const { data, refetch, loading } = useQuery(FAVORITES_QUERY, {
    variables: { favorites },
    errorPolicy: false,
    onCompleted: (data) => {
      setItems(data.allShopifyProduct.nodes);
    },
  });

  useEffect(() => {
    refetch();
  }, [favorites]);

  if (loading) {
    return (
      <Layout>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-[48px] text-center">LOADING...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="flex flex-col w-full">
          <h2 className="text-[48px] text-center my-[62px]">Favorites</h2>

          <div className="flex flex-wrap space-x-4 mt-8 w-full">
            {items.length > 0 ? (
              items.map((data, i) => (
                <ProductCard {...data} key={`favorite${i}`} />
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-[48px] text-center">NO FAVORITES ADDED</h1>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const FAVORITES_QUERY = gql`
  query getFavorites($favorites: [String]) {
    allShopifyProduct(filter: { id: { in: $favorites } }) {
      nodes {
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
        variants {
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const Head = () => (
  <>
    <html lang="en" />
    <title>Elleven</title>
    <meta name="description" content="Elleven Womans Wear" />
  </>
);

export default Favorites;
