import React from "react";
import useStore from "../context/StoreContext";
import { Button, Layout, Modal } from "../components";
import { GrFormClose } from "react-icons/gr";

const DesktopBody = () => {
  const { checkout, removeLineItem } = useStore();

  return (
    <tbody className="border-b-[1px] border-myLightGray mob:hidden lg:table-header-group">
      {checkout.lineItems.map((item, i) => (
        <tr className="[&>td]:p-4" key={i}>
          <td className="flex space-x-2">
            <img
              src={item.variant.image.src}
              width="90px"
              alt={`${item.title}`}
            />
            <div className="flex flex-col text-lg max-w-[200px] uppercase">
              <span>{item.title}</span>
              <div className="mt-2 border-gray-600 border-[1px] self-start flex items-center justify-center">
                <span
                  className={`w-[20px] h-[20px] m-[2px] color-${item.variant.selectedOptions[0].value.replace(
                    /\s+/g,
                    ""
                  )}`}
                ></span>
              </div>
            </div>
          </td>
          <td>
            {item.variant.priceV2.amount * item.quantity}{" "}
            {item.variant.priceV2.currencyCode}
          </td>
          <td>{item.variant.selectedOptions[1].value}</td>
          <td className="  ">
            <div className="flex items-center justify-between">
              <span> {item.quantity}</span>

              <GrFormClose
                onClick={() => removeLineItem(item.variant.id)}
                className="cursor-pointer bg-secondary text-2xl hover:bg-[#D0E4F2] transition-colors"
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const MobileBody = () => {
  const { checkout, removeLineItem } = useStore();

  return (
    <tbody className="border-b-[1px] border-myLightGray lg:hidden">
      {checkout.lineItems.map((item, i) => (
        <tr className="[&>td]:p-4" key={i}>
          <td className="flex space-x-2">
            <img
              src={item.variant.image.src}
              width="90px"
              alt={`${item.title}`}
            />
            <div className="flex flex-col text-lg max-w-[200px] uppercase">
              <span>{item.title}</span>
              <div className="mt-2 border-gray-600 border-[1px] self-start flex items-center justify-center">
                <span
                  className={`w-[20px] h-[20px] m-[2px] color-${item.variant.selectedOptions[0].value.replace(
                    /\s+/g,
                    ""
                  )}`}
                ></span>
              </div>
              <div className="text-sm mt-2">
                <span className="text-myLightGray">Size:</span>{" "}
                {item.variant.selectedOptions[1].value}
              </div>
              <div className="text-sm mt-2">
                {item.quantity} X {item.variant.priceV2.amount}{" "}
                {item.variant.priceV2.currencyCode}
              </div>
            </div>
          </td>
          <td>
            <div className="flex items-center justify-between">
              <GrFormClose
                onClick={() => removeLineItem(item.variant.id)}
                className="cursor-pointer bg-secondary text-2xl hover:bg-[#D0E4F2] transition-colors"
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Cart = ({ data }) => {
  const { checkout, error, cart } = useStore();

  console.log(checkout?.totalPriceV2?.amount);

  return (
    <Layout>
      <h2 className="text-[48px] text-center my-[62px]">Shopping Cart</h2>
      {checkout.lineItems.length !== 0 ? (
        <div className="max-w-[1440px] lg:m-auto flex lg:flex-row mob:mx-4 mob:space-y-8 lg:space-y-0 lg:space-x-8 mob:flex-col items-center">
          <div className="mob:w-full lg:w-2/3 flex flex-col">
            <table className="text-left w-full">
              <thead className="border-b-[1px] border-myLightGray mob:hidden lg:table-header-group">
                <tr className="[&>th]:p-4">
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>SIZE</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>
              <DesktopBody />
              <MobileBody />
            </table>
            <div className="lg:first-letter:flex justify-between w-full mt-8 mob:hidden ">
              <Button variant="gray">Continue shopping</Button>
              <Button variant="gray">Clear Shopping Cart</Button>
            </div>
          </div>
          <div className="mob:w-full lg:w-1/3 flex flex-col items-center justify-start">
            <div className="mob:p-4 lg:p-8 space-y-4 border-[2px] bg-gray-100 border-gray-200 w-full">
              <div className="w-full flex justify-between text-lg font-medium">
                <span>Subtotal:</span>
                <span>
                  {checkout?.subtotalPriceV2?.amount}{" "}
                  {checkout?.subtotalPriceV2?.currencyCode}
                </span>
              </div>
              <div className="w-full mob:hidden lg:flex  justify-between text-lg font-medium">
                <span className="text-myDarkGray">Tax:</span>
                <span className="text-myDarkGray">
                  {checkout?.totalTaxV2?.amount}{" "}
                  {checkout?.totalTaxV2?.currencyCode}
                </span>
              </div>
              <div className="w-full mob:hidden lg:flex justify-between text-[24px] font-regular">
                <span>Order Total:</span>
                <span>
                  {checkout?.totalPriceV2?.amount}{" "}
                  {checkout?.totalPriceV2?.currencyCode}
                </span>
              </div>
            </div>
            <Button
              variant="black"
              size="full"
              onClick={() => window.open(checkout.webUrl)}
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="text-[48px] text-center">CART IS EMPTY</h1>
      )}
      {error === "removed" && (
        <Modal icon="success" variant="success">
          Product has been removed from the cart
        </Modal>
      )}
    </Layout>
  );
};

export default Cart;

export const Head = () => (
  <>
    <html lang="en" />
    <title>Elleven</title>
    <meta name="description" content="Elleven Womans Wear" />
  </>
);
