import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import FetchSummerColection from "../hooks/FetchSummerCollection";
import FetchBestCollection from "../hooks/FetchBestCollection";
import { Button } from "../components";
import { Link } from "gatsby";
// import FetchWinterCollection from "../hooks/FetchWinterCollection";
// import FetchTrendingCollection from "../hooks/FetchTrendingCollection";

export const ProductsCatalog = () => {
  const [value, setValue] = useState("summer");

  return (
    <>
      <section className="max-w-[1880px] m-auto px-4 flex my-32 mob:flex-col lg:flex-row">
        <div className="lg:w-[15%] md:w-full md:border-r-[1px] md:border-myLightGray">
          <h2 className="text-[24px] mb-[40px]">Shop Some Wear:</h2>
          <Formik
            initialValues={{
              collection: "best-sellers",
            }}
          >
            {({ values }) => (
              <Form onChange={(e) => setValue(e.target.value)}>
                <div
                  role="group"
                  className="flex md:flex-col mob:flex-row items-start justify-center mob:space-x-1 md:space-x-0  lg:space-y-2 [&>label]:flex [&>label]:space-x-1  "
                >
                  <label>
                    <Field
                      type="radio"
                      name="collection"
                      value="best-sellers"
                      className="mob:self-start md:self-center mob:mt-1 md:mt-0"
                    />
                    <span>BEST SELLERS</span>
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="collection"
                      value="summer"
                      className="mob:self-start md:self-center mob:mt-1 md:mt-0"
                    />
                    <span>COLLECTION: SUMMER</span>
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="collection"
                      value="winter"
                      className="mob:self-start md:self-center mob:mt-1 md:mt-0"
                    />
                    <span>COLLECTION: WINTER</span>
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="collection"
                      value="trending"
                      className="mob:self-start md:self-center mob:mt-1 md:mt-0"
                    />
                    <span>TRENDING</span>
                  </label>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* <div className="lg:max-w-[90%] mob:w-full lg:items-start lg:place-content-start md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4 min-h-[100vh] px-6"> */}
        <div className="lg:max-w-[85%] mob:w-full px-6 flex flex-wrap gap-[40px] lg:justify-between mob:justify-center mob:mt-16 lg:mt-0">
          {value === "best-sellers" && <FetchBestCollection />}
          {value === "summer" && <FetchSummerColection />}
          {/* {value === "winter" && <FetchWinterCollection />}
          {value === "trending" && <FetchTrendingCollection />} */}
          <div className="w-full flex justify-center">
            <Link to={`/collection/${value}`}>
              <Button variant="gray">Load More</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
