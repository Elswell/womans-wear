require("dotenv").config();
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Elleven",
    description: "WOMAN'S WEAR",
    author: "@Elswell",
  },
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-shopify",
      options: {
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        password: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        shopifyConnections: ["collections"], // source product collections too
      },
    },
  ],
};
