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
  const { title, descriptionHtml, featuredImage, options, variants } =
    data.shopifyProduct;
  const [color, size] = options;
  const { amount, currencyCode } =
    data.shopifyProduct.priceRangeV2.maxVariantPrice;
  const image = getImage(featuredImage);

  const [productColor, setProductColor] = useState();
  const [productSize, setProductSize] = useState();
  const [variantId, setVariantId] = useState();
  const [quantity, setQuantity] = useState(1);
  const { addVariantToCart, removeLineItem, error, checkout } = useStore();

  const handleQuantity = (bool) => {
    if (bool) {
      setQuantity(quantity + 1);
    } else if (!bool) {
      quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const combinedVariant = productColor + " / " + productSize;
    const productID = variants.forEach((item) => {
      if (item.title === combinedVariant) {
        setVariantId(item.shopifyId);
      }
    });
  }, [productColor, productSize]);

  return (
    <Layout>
      <div className="max-w-[1440px] m-auto flex my-16 mob:flex-col mob:items-center lg:items-start lg:flex-row ">
        <div className="flex flex-1 flex-col space-y-2 relative">
          <GatsbyImage
            image={image}
            alt="alt"
            className="w-[624px] h-[790px]"
          />
          <div className="items-center justify-center space-x-4 -ml-24 hidden">
            <span className="font-semibold">SHARE:</span> <FaFacebookF />{" "}
            <FaTwitter /> <AiFillInstagram />
          </div>
        </div>
        <div className="flex flex-col px-4">
          <h2 className="font-medium text-[48px] max-w-[70%]">{title}</h2>
          <div className="flex flex-col space-y-2">
            <span className="text-sm">SELECT COLOR</span>
            <Formik>
              {({ values }) => (
                <Form
                  className="flex w-full flex-wrap"
                  onChange={(e) => setProductColor(e.target.value)}
                >
                  {color.values.map((data, i) => (
                    <label
                      className={cls(
                        ` transition-colors flex p-[2px] cursor-pointer ${
                          productColor === data
                            ? "border-[2px] border-black"
                            : "border-[2px] border-transparent hover:border-gray-600 "
                        }`
                      )}
                      key={i}
                    >
                      <Field type="radio" value={data} className="hidden" />
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
                <Form
                  className="flex space-x-4"
                  onChange={(e) => setProductSize(e.target.value)}
                >
                  {size.values.map((data, i) => (
                    <label
                      className={cls(
                        ` transition-colors flex p-[2px] cursor-pointer ${
                          productSize === data
                            ? "border-[1px] border-[#000] [&>span]:text-[#000]"
                            : "border-[1px] border-myDarkGray [&>span]:text-myDarkGray hover:border-gray-600 hover:[&>span]:text-gray-600"
                        }`
                      )}
                      key={i}
                    >
                      <Field type="radio" value={data} className="hidden" />
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
                  value={quantity}
                  className={cls(
                    `w-2/4 text-center focus:outline-none ${
                      quantity === 0 && "text-gray-400"
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
                {quantity !== 0 ? amount * quantity : amount} {currencyCode}
              </span>
            </div>
          </div>
          <div className="flex space-x-8">
            <Button
              className="self-start"
              variant="black"
              size="fixed220"
              className="border-2 border-black hover:border-primary"
              onClick={() => addVariantToCart(variantId, quantity)}
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
