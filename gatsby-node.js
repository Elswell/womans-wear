const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const products = graphql(
    `
      query allProducts {
        allShopifyProduct {
          nodes {
            handle
          }
        }
      }
    `
  ).then((res) => {
    res.data.allShopifyProduct.nodes.forEach((node) => {
      const slug = node.handle;
      createPage({
        path: "/product/" + slug,
        component: path.resolve("./src/template/ProductPage.jsx"),
        context: { slug: slug },
      });
    });
  });

  const collections = graphql(
    `
      query allCollections {
        allShopifyCollection {
          nodes {
            handle
          }
        }
      }
    `
  ).then((res) => {
    res.data.allShopifyCollection.nodes.forEach((node) => {
      const collectionSlug = node.handle;
      createPage({
        path: `/collection/${collectionSlug}`,
        component: path.resolve("./src/template/CollectionPage.jsx"),
        context: { slug: collectionSlug },
      });
    });
  });

  return Promise.all([products, collections]);
};
