import * as React from "react";
import { Layout, SEO, ProductsCarousel } from "../components";
import { Hero, Content, ProductsCatalog, BottomHero } from "../sections";

export default function Home() {
  return (
    <Layout>
      <SEO />
      <Hero />
      <Content />
      <ProductsCatalog />
      <BottomHero />
      <ProductsCarousel />
    </Layout>
  );
}
