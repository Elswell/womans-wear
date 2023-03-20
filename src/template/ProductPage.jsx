import React, { useEffect, useState } from "react";
import { Button, Layout, Modal } from "../components/";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {
  AiFillInstagram,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
} from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { cls } from "../util/cls";
import useStore from "../context/StoreContext";

export default function ProductPage({ data }) {
  const { title, descriptionHtml, featuredImage, options, variants, media } =
    data.shopifyProduct;
  const [color, size] = options;
  const { amount, currencyCode } =
    data.shopifyProduct.priceRangeV2.maxVariantPrice;
  const image = getImage(featuredImage);

  const [currentImage, setCurrentImage] = useState();
  const imagePreview = getImage(currentImage);

  const [selectedOptions, setSelectedOptions] = useState({
    color: null,
    size: null,
    quantity: 1,
    image: null,
  });

  const [variantId, setVariantId] = useState();
  const [loading, setLoading] = useState(false);
  const { addVariantToCart, error } = useStore();

  const handleQuantity = (bool) => {
    if (bool) {
      setSelectedOptions({
        ...selectedOptions,
        quantity: selectedOptions.quantity + 1,
      });
    } else if (!bool) {
      selectedOptions.quantity === 0
        ? setSelectedOptions({
            ...selectedOptions,
            quantity: 0,
          })
        : setSelectedOptions({
            ...selectedOptions,
            quantity: selectedOptions.quantity - 1,
          });
    }
  };

  useEffect(() => {
    if (!selectedOptions.color) {
      return;
    } else {
      variants.forEach((variant) => {
        if (variant.title.includes(selectedOptions.color)) {
          setSelectedOptions({
            ...selectedOptions,
            image: variant.image.gatsbyImageData,
          });
        }
      });
    }
  }, [selectedOptions.color]);

  useEffect(() => {
    const combinedVariant =
      selectedOptions.color + " / " + selectedOptions.size;
    variants.forEach((item) => {
      if (item.title === combinedVariant) {
        setVariantId(item.shopifyId);
      }
    });
  }, [selectedOptions.color, selectedOptions.size]);

  return (
    <Layout>
      <div className="px-2 lg:px-0 max-w-[1440px] m-auto flex my-16 mob:flex-col mob:items-center lg:items-start lg:flex-row ">
        <div className="flex flex-1 flex-col space-y-2 relative">
          <div className="flex flex-col lg:mr-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <GatsbyImage
                image={selectedOptions.image ? selectedOptions.image : image}
                alt="featured-product-image"
                className="max-w-[624px] max-h-[790px]"
                onStartLoad={() => setLoading(true)}
                onLoad={() => setLoading(false)}
              />
            )}
            <div className="flex flex-wrap justify-between max-w-[624px] mt-2">
              {media.map((image, i) => (
                <GatsbyImage
                  image={image.image.gatsbyImageData}
                  alt="variant-product-image"
                  className="w-[76px] h-[96px]"
                />
              ))}
            </div>
          </div>
          <div className="items-center justify-center space-x-4 -ml-24 hidden">
            <span className="font-semibold">SHARE:</span> <FaFacebookF />{" "}
            <FaTwitter /> <AiFillInstagram />
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 lg:mt-0 lg:items-start max-w-[624px] w-full flex-wrap ">
          <h2 className="font-medium text-2xl w-2/3 lg:w-full lg:leading-[50px] lg:text-[48px] ">
            {title}
          </h2>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">SELECT COLOR</span>
            <Formik>
              {({ values }) => (
                <Form className="flex w-full flex-wrap">
                  {color.values.map((data, i) => (
                    <label
                      className={cls(
                        ` transition-colors flex p-[2px] cursor-pointer ${
                          selectedOptions.color === data
                            ? "border-[2px] border-black"
                            : "border-[2px] border-transparent hover:border-gray-600 "
                        }`
                      )}
                      key={i}
                    >
                      <Field
                        type="radio"
                        value={data}
                        className="hidden"
                        onChange={(e) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            color: e.target.value,
                          })
                        }
                      />
                      <span
                        className={`w-[25px] h-[25px] color-${data.replace(
                          /\s+/g,
                          ""
                        )}`}
                      ></span>
                    </label>
                  ))}
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col space-y-2 mt-[22px] mb-[36px]">
            <span className="text-sm">SELECT SIZE</span>
            <Formik>
              {({ values }) => (
                <Form className="flex space-x-4">
                  {size.values.map((data, i) => (
                    <label
                      className={cls(
                        ` transition-colors flex p-[2px] cursor-pointer ${
                          selectedOptions.size === data
                            ? "border-[1px] border-[#000] [&>span]:text-[#000]"
                            : "border-[1px] border-myDarkGray [&>span]:text-myDarkGray hover:border-gray-600 hover:[&>span]:text-gray-600"
                        }`
                      )}
                      key={i}
                    >
                      <Field
                        type="radio"
                        value={data}
                        className="hidden"
                        onChange={(e) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            size: e.target.value,
                          })
                        }
                      />
                      <span className="w-[45px] h-[45px] text-center flex items-center justify-center text-myDarkGray">
                        {data}
                      </span>
                    </label>
                  ))}
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex space-x-[24px] mb-[36px]">
            <div className="flex flex-col space-y-2">
              <span>QUANTITY</span>
              <div className="w-[120px]  self-start flex max- justify-between border-2 border-gray-300 [&>button]:text-gray-400 [&>button]:text-lg ">
                <button
                  onClick={() => handleQuantity(false)}
                  className="w-1/4 hover:bg-[#F0F2F2] group py-2"
                >
                  <AiOutlineMinus className="self-center w-full group-hover:text-myDarkGray transition-colors" />
                </button>
                <input
                  type="text"
                  value={selectedOptions.quantity}
                  className={cls(
                    `w-2/4 text-center focus:outline-none ${
                      selectedOptions.quantity === 0 && "text-gray-400"
                    }`
                  )}
                  required
                />
                <button
                  onClick={() => handleQuantity(true)}
                  className="w-1/4 hover:bg-[#F0F2F2] group py-2  "
                >
                  <AiOutlinePlus className="self-center w-full group-hover:text-myDarkGray transition-colors" />
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span>PRICE TOTAL</span>
              <span className="font-medium text-[26px]">
                {selectedOptions.quantity !== 0
                  ? amount * selectedOptions.quantity
                  : amount}{" "}
                {currencyCode}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
            <Button
              className="self-start"
              variant="black"
              size="fixed220"
              className="border-2 border-black hover:border-primary"
              onClick={() =>
                addVariantToCart(variantId, selectedOptions.quantity)
              }
            >
              Add to Cart
            </Button>
            <Button
              className="self-start flex items-center justify-center text-center space-x-1"
              size="fixed220"
              variant="gray"
            >
              <AiOutlineHeart /> <span>SAVE</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] m-auto flex bg-[#f1f1f1] p-8 flex-col">
        <div className="border-b-[1px] border-[#C4C4C4] w-full">
          <p className="text-[24px] mb-[24px]">Details</p>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          className="mt-[32px]"
        ></p>
      </div>
      {error === "invalid" && (
        <Modal icon="danger" variant="danger">
          Select color,size and quantity.
        </Modal>
      )}
      {error === "added" && (
        <Modal icon="success" variant="success">
          Product has been added to the cart.
        </Modal>
      )}
    </Layout>
  );
}

export const Head = () => (
  <>
    <html lang="en" />
    <title>Elleven</title>
    <meta name="description" content="Elleven Womans Wear" />
  </>
);

export const query = graphql`
  query ProductPageDetails($slug: String) {
    shopifyProduct(handle: { eq: $slug }) {
      id
      title
      descriptionHtml
      options {
        name
        values
        shopifyId
      }
      variants {
        shopifyId
        title
        availableForSale
        image {
          gatsbyImageData
        }
      }
      media {
        ... on ShopifyMediaImage {
          id
          image {
            gatsbyImageData
          }
        }
      }
      featuredImage {
        gatsbyImageData
      }
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;
