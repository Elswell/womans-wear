import * as React from "react";
import { Layout, ProductsCarousel } from "../components";
import { Hero, Content, ProductsCatalog, BottomHero } from "../sections";

export const Head = () => (
  <>
    <html lang="en" />
    <title>Elleven</title>
    <meta name="description" content="Elleven Womans Wear" />
  </>
);

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Content />
      <ProductsCatalog />
      <BottomHero />
      <ProductsCarousel />
    </Layout>
  );
}
