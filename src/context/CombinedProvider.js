import React from "react";

import { StoreProvider } from "./StoreContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";

const CombinedProvider = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>{element}</StoreProvider>
    </ApolloProvider>
  );
};

export default CombinedProvider;
