import React, { createContext, useContext, useEffect, useState } from "react";
import Client from "shopify-buy";
import fetch from "isomorphic-fetch";

export const shopifyClient = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
);

const defaultValues = {
  cart: [],
  loading: false,
  error: null,
  addVariantToCart: () => {},
  removeLineItem: () => {},
  shopifyClient,
  checkout: {
    id: "",
    lineItems: [],
    webUrl: "",
  },
};

const StoreContext = createContext(defaultValues);

const isBrowser = typeof window != undefined;
const localStorageKey = "shopify_checkout_id";

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(defaultValues.cart);
  const [checkout, setCheckout] = useState(defaultValues.checkout);
  const [loading, setLoading] = useState(defaultValues.loading);
  const [error, setError] = useState(defaultValues.isEmpty);

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id);
    }

    setCheckout(checkout);
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null;

      if (existingCheckoutID && existingCheckoutID !== "null") {
        try {
          const existingCheckout = await shopifyClient.checkout.fetch(
            existingCheckoutID
          );

          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return;
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }

        return;
      }

      const newCheckout = await shopifyClient.checkout.create();
      setCheckoutItem(newCheckout);
    };
    initializeCheckout();
  }, []);

  const addVariantToCart = async (variantId, quantity) => {
    if (quantity === 0) {
      setError("invalid");

      setTimeout(() => {
        setError(null);
      }, 2000);

      return;
    }

    setLoading(true);

    if (checkout.id === "") {
      console.error("No checkout ID assigned");
      return;
    }

    const checkoutID = checkout.id;
    const parsedQuantity = parseInt(quantity, 10);

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parsedQuantity,
      },
    ];

    try {
      const res = await shopifyClient.checkout.addLineItems(
        checkoutID,
        lineItemsToUpdate
      );

      setCheckout({
        ...checkout,
        lineItems: res.lineItems,
      });

      let updateCart = [];

      if (cart) {
        const itemsInCart = cart.find((item) => item.variantId === variantId);

        if (itemsInCart) {
          const newProduct = {
            product: { ...itemsInCart.product },
            quantity: itemsInCart.quantity === parsedQuantity,
          };

          const otherItems = cart.filter(
            (item) => item.variantId === variantId
          );
          updateCart = [...otherItems, newProduct];
        } else {
          updateCart = cart.concat([{ variantId, quantity: parsedQuantity }]);
        }
        setCart(updateCart);
        setLoading(false);
        setError("added");

        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (e) {
      setLoading(false);
      setError("invalid");

      setTimeout(() => {
        setError(null);
      }, 2000);
      console.error(`Error in addVariantToCart: ${e}`);
    }
  };

  const removeLineItem = async (variantId) => {
    setLoading(true);
    try {
      if (checkout.lineItems.length < 1) throw new Error("Cart is empty");

      let lineItemID = "";
      checkout.lineItems?.forEach((item) => {
        if (item.variant.id === variantId) {
          lineItemID = item.id;
        }
      });

      if (!lineItemID) {
        console.log("Product not in cart");
        return;
      }

      const res = await shopifyClient.checkout.removeLineItems(checkout.id, [
        lineItemID,
      ]);
      setCheckout(res);

      const updatedCart = cart.filter(
        (item) => item.product.variants[0]?.shopifyId !== variantId
      );
      setCart(updatedCart);
      setLoading(false);

      setError("removed");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error(`Error in removeLineItem: ${error}`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        cart,
        checkout,
        loading,
        error,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within StoreContext");
  }

  return context;
};

export default useStore;
