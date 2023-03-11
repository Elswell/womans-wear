import * as React from "react";
import { Layout, Seo, ProductsCarousel } from "../components";
import { Hero, Content, ProductsCatalog, BottomHero } from "../sections";

export default function Home() {
  return (
    <Layout>
      <Seo />
      <Hero />
      <Content />
      <ProductsCatalog />
      <BottomHero />
      <ProductsCarousel />
    </Layout>
  );
}
