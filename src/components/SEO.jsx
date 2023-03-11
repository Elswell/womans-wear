import React from "react";
import { useSiteMetadata } from "../hooks/Metadata";

export const Seo = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription } =
    useSiteMetadata();

  const seoInfo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <title>{seoInfo.title}</title>
      <meta name="description" content={seoInfo.description} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </>
  );
};
