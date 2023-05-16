import React, { useState } from "react";
import { cls } from "../util/cls";
import Slider from "@mui/material/Slider";
import { Field, Form, Formik } from "formik";
import { Button } from "./ui/Button";
import { useLocation } from "@reach/router";

const sizes = ["S", "M", "L", "XL"];
const activeSizes = ["S", "M", "L", "XL", "1X", "2X", "3X"];
const colors = [
  "Forest",
  "VividCerise",
  "PastelBlue",
  "BlushPink",
  "CanaryYellow",
  "ArmyGreen",
  "White",
  "Stripe",
  "Gray",
  "Blue",
  "Green",
  "Black",
  "Pink",
  "Yellow",
  "LightGray",
  "Khaki",
  "Red",
  "PumpkinSpice",
  "Evergreen",
  "VeryPink",
  "Cream",
];

export const FilterSidebar = ({ onSubmit, emptyError, onReset }) => {
  const [toggleSize, setToggleSize] = useState(true);
  const [toggleColor, setToggleColor] = useState(true);
  const [togglePrice, setTogglePrice] = useState(true);
  const [range, setRange] = useState([0, 250]);
  const [productColor, setProductColor] = useState([]);

  const location = useLocation();
  const slug = location.pathname.replace("/collection/", "").split("/")[0];

  const [productSize, setProductSize] = useState(
    slug === "active-wear" ? activeSizes : sizes
  );

  const handleSlider = (event, newValue) => {
    setRange(newValue);
  };

  const handleSubmit = () => {
    onSubmit(range, productSize);
  };

  const resetFilters = () => {
    setProductSize(slug === "active-wear" ? activeSizes : sizes);
    setRange([0, 250]);
    onReset(productSize, range);
  };

  const handleColor = (e) => {
    const colorValue = e.target.value;

    setProductColor((prev) => [...prev, colorValue]);

    if (productColor.includes(colorValue)) {
      const newArray = productColor.filter((item) => item !== colorValue);
      setProductColor(newArray);
    }
  };

  const handleSize = (e) => {
    const sizeValue = e.target.value;

    if (productSize.includes(sizeValue)) {
      const newArray = productSize.filter((item) => item !== sizeValue);
      setProductSize(newArray);
    } else {
      setProductSize((prev) => [...prev, sizeValue]);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mx-4">
      {!productSize.length || !range ? null : (
        <div className="border-[1px] p-2 border-black flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-3xl">Filters</p>{" "}
            {/* <button onClick={() => clearFilters()}>Clear filters</button> */}
          </div>
          {productSize.length ? (
            <div>
              <p className="text-2xl">Size</p>
              <div className="space-x-2">
                {productSize.map((size, i) => (
                  <span className="text-sm font-light">{size}</span>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <p className="text-2xl">Price</p>
            <div className="text-sm font-light">
              <span>{range[0]} BGN</span> - <span>{range[1]} BGN</span>
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          onClick={() => setToggleSize(!toggleSize)}
          className="flex justify-between w-full"
        >
          <p className="text-2xl">Size</p> <span>-</span>
        </button>
        <div
          className={cls(
            `justify-between my-8 transition-all  ${
              toggleSize ? "flex " : "hidden "
            }`
          )}
        >
          <Formik>
            {({ values }) => (
              <Form className="flex flex-wrap" onChange={(e) => handleSize(e)}>
                {slug === "active-wear"
                  ? activeSizes.map((data, i) => (
                      <label
                        className={cls(
                          ` transition-colors flex p-[2px] cursor-pointer m-1 ${
                            productSize && productSize.includes(data)
                              ? "border-[1px] border-[#000] [&>span]:text-[#000]"
                              : "border-[1px] border-myDarkGray [&>span]:text-myDarkGray hover:border-gray-600 hover:[&>span]:text-gray-600"
                          }`
                        )}
                        key={i}
                      >
                        <Field type="radio" value={data} className="hidden" />
                        <span className="w-[40px] h-[40px] text-center flex items-center justify-center text-myDarkGray">
                          {data}
                        </span>
                      </label>
                    ))
                  : sizes.map((data, i) => (
                      <label
                        className={cls(
                          ` transition-colors flex p-[2px] cursor-pointer m-1 ${
                            productSize && productSize.includes(data)
                              ? "border-[1px] border-[#000] [&>span]:text-[#000]"
                              : "border-[1px] border-myDarkGray [&>span]:text-myDarkGray hover:border-gray-600 hover:[&>span]:text-gray-600"
                          }`
                        )}
                        key={i}
                      >
                        <Field type="radio" value={data} className="hidden" />
                        <span className="w-[40px] h-[40px] text-center flex items-center justify-center text-myDarkGray">
                          {data}
                        </span>
                      </label>
                    ))}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* <div>
        <button
          className="flex justify-between w-full"
          onClick={() => setToggleColor(!toggleColor)}
        >
          <p className="text-2xl">Color</p> <span>-</span>
        </button>
        <div
          className={cls(
            `flex-wrap w-[85%]  my-8 ${toggleColor ? "flex" : "hidden"}`
          )}
        >
          <Formik>
            {({ values }) => (
              <Form
                className="flex w-full flex-wrap"
                onChange={(e) => handleColor(e)}
              >
                {colors.map((data, i) => (
                  <label
                    className={cls(
                      ` transition-colors flex p-[2px] m-1 cursor-pointer ${
                        productColor && productColor.includes(data)
                          ? "border-[1px] border-black"
                          : "border-[1px] border-transparent hover:border-gray-600 "
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
      </div> */}
      <div>
        <button
          className="flex justify-between w-full"
          onClick={() => setTogglePrice(!togglePrice)}
        >
          <p className="text-2xl">Price</p> <span>-</span>
        </button>
        <div
          className={cls(
            `my-8 mx-4 ${togglePrice ? "flex flex-col" : "hidden"}`
          )}
        >
          <div className="flex justify-between w-full sm:text-sm lg:text-lg">
            <span>{range[0] + " BGN"}</span> <span>{range[1] + " BGN"}</span>
          </div>
          <Slider
            value={range}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            min={0}
            max={250}
            className="text-black"
          />
        </div>
      </div>
      {emptyError && (
        <p className="text-red-500">Nothing matches your filters!</p>
      )}
      <Button
        variant="gray"
        size="normal"
        className="mt-4"
        onClick={() => handleSubmit()}
      >
        Apply
      </Button>
      <Button
        variant="gray"
        size="normal"
        className="mt-4"
        onClick={() => resetFilters()}
      >
        Reset FIlters
      </Button>
    </div>
  );
};
