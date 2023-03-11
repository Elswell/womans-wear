import React from "react";

const ProductsLayout = ({ sidebar, products }) => {
  return (
    <section className="max-w-[1880px] m-auto px-4 flex mt-32 mob:flex-col lg:flex-row min-h-[100vh]">
      <div className="lg:w-[15%] md:w-full md:border-r-[1px] md:border-myLightGray">
        {sidebar}
      </div>

      <div className="lg:max-w-[85%] mob:w-full px-6 flex flex-wrap gap-[40px] lg:justify-between mob:justify-center mob:mt-16 lg:mt-0">
        {products}
      </div>
    </section>
  );
};

export default ProductsLayout;
