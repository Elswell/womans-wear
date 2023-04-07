import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useStore from "../context/StoreContext";

export const ProductCard = (data) => {
  const { favorites, addFavorite } = useStore();

  const { id, title, handle } = data;
  const { amount, currencyCode } = data.priceRangeV2.maxVariantPrice;
  const image = getImage(data.featuredImage);

  return (
    <div className="relative">
      <Link to={`/product/` + handle} className="relative z-10">
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
      {favorites.includes(id) ? (
        <AiFillHeart
          className="absolute top-4 right-4 z-50 text-3xl text-white hover:text-red-500 transition-colors"
          onClick={() => addFavorite(id)}
        />
      ) : (
        <AiOutlineHeart
          className="absolute top-4 right-4 z-50 text-3xl text-white hover:text-red-500 transition-colors"
          onClick={() => addFavorite(id)}
        />
      )}
    </div>
  );
};
