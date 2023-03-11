import { graphql } from "gatsby";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FilterSidebar, Layout, ProductCard, SEO } from "../components";
import ProductsLayout from "../components/ProductsLayout";
import { BottomHero } from "../sections";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "@reach/router";

export default function CollectionPage({ data }) {
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([0, 250]);
  const [filteredSize, setFilteredSize] = useState();
  const [filteredPrice, setFilteredPrice] = useState();
  const [activeFilters, setActiveFilters] = useState({
    activeSize: [],
    activePrize: [],
  });

  const { products: collectionProducts } = data.allShopifyCollection.nodes[0];
  const [current, setCurrent] = useState(collectionProducts);

  const location = useLocation();
  const slug = location.pathname.replace("/collection/", "").split("/")[0];

  const lte = price[1];
  const gte = price[0];

  const {
    loading: priceLoading,
    error: priceError,
    data: priceData,
    refetch: refetchPriceRange,
  } = useQuery(PRODUCTS_QUERY_PRICE_RANGE, {
    variables: { slug, gte, lte },
    errorPolicy: false,
    onCompleted: (priceData) => {
      setFilteredPrice(priceData.allShopifyProduct.nodes);
    },
  });

  const {
    loading: sizeLoading,
    error: sizeError,
    data: sizeData,
    refetch: refetchSize,
  } = useQuery(PRODUCTS_QUERY_SIZE, {
    variables: { slug, size },
    errorPolicy: false,
    onCompleted: (sizeData) => {
      setFilteredSize(sizeData.allShopifyProduct.nodes);
    },
  });

  const handleFilter = (range, productSize) => {
    if (range && productSize) {
      setPrice(range);
      setSize(productSize);
    } else {
      setSize(["S", "M", "L", "XL"]);
    }
  };

  const resetFilter = () => {
    setCurrent(collectionProducts);
    setPrice([0, 250]);
    setSize([]);
  };

  useEffect(() => {
    if (!filteredPrice || !filteredSize) {
      console.log("One or more filtered arrays are undefined");
      return;
    }

    const filteredProducts = filteredPrice.concat(filteredSize);

    const repeatingProducts = filteredProducts.filter(
      (product, index, self) => {
        return index !== self.findIndex((p) => p.id === product.id);
      }
    );

    if (repeatingProducts.length === 0) {
      console.log("empty");
      return;
    } else {
      setCurrent(repeatingProducts);
    }
  }, [filteredPrice, filteredSize]);

  useEffect(() => {
    refetchPriceRange();
    refetchSize();
  }, [price, size]);

  return (
    <Layout>
      <SEO />
      <BottomHero />
      <ProductsLayout
        products={current?.map((data, i) => (
          <ProductCard {...data} key={i} />
        ))}
        sidebar={
          <FilterSidebar
            onSubmit={(range, productSize) => handleFilter(range, productSize)}
            onReset={() => resetFilter()}
          />
        }
      />
    </Layout>
  );
}

const PRODUCTS_QUERY_PRICE_RANGE = gql`
  query collectionProductsQueryPriceRange(
    $slug: String
    $lte: Float
    $gte: Float
  ) {
    allShopifyProduct(
      filter: {
        collections: { elemMatch: { handle: { eq: $slug } } }
        variants: { elemMatch: { price: { lte: $lte, gte: $gte } } }
      }
    ) {
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

const PRODUCTS_QUERY_SIZE = gql`
  query collectionProductsQuerySize($slug: String, $size: [String]) {
    allShopifyProduct(
      filter: {
        collections: { elemMatch: { handle: { eq: $slug } } }
        variants: {
          elemMatch: {
            selectedOptions: {
              elemMatch: { name: { eq: "Size" }, value: { in: $size } }
            }
          }
        }
      }
    ) {
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

export const collectionProductsQuery = graphql`
  query collectionProductsQuery($slug: String) {
    allShopifyCollection(filter: { handle: { eq: $slug } }) {
      nodes {
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
          variants {
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
