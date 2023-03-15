import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const ProductCard = (data) => {
  const { title, handle } = data;
  const { amount, currencyCode } = data.priceRangeV2.maxVariantPrice;
  const image = getImage(data.featuredImage);

  console.log(data.tags);

  return (
    <Link to={`/product/` + handle}>
      <GatsbyImage image={image} alt="alt" className="w-[344px] h-[450px]" />
      <p className="font-semibold uppercase text-[14px] text-myLightGray">
        {data.collections.length || data.tags > 0
          ? data.collections[0].title
          : "NONE"}
      </p>
      <p className="font-light text-lg ">{title}</p>
      <p className="font-medium text-[22px] mt-[18px]">
        {amount} {currencyCode}
      </p>
    </Link>
  );
};
