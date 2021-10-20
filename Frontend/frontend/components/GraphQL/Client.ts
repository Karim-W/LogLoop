import React from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import cookie from "js-cookie";

// const GQLClient = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

// export default GQLClient;

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wiaWRcIjoxLFwiY3JlYXRlZEF0XCI6XCIyMDIxLTEwLTE1VDE3OjU2OjA2LjAwMFpcIixcInVwZGF0ZWRBdFwiOlwiMjAyMS0xMC0xNVQxOTowMjozNC4wMDBaXCIsXCJmaXJzdE5hbWVcIjpcImthcmltXCIsXCJsYXN0TmFtZVwiOlwiSGFzc2FuXCIsXCJ1c2VyTmFtZVwiOlwia2FyaW1cIixcImVtYWlsXCI6XCJrYXJpbS53YWVsQGdtYWlsLmNvbVwiLFwicGFzc3dvcmRcIjpcInBhc3NcIixcInBob25lXCI6XCIrOTcxNTY2OTE4MTA4XCIsXCJpbWdVcmxcIjpudWxsfSIsImlhdCI6MTYzNDc0MzU1NiwiZXhwIjoxNjM0NzQ3MTU2fQ.yNAwg2NM6fatkvwk5xdo7-8ZoaoON2XWh6xyY1NmqgI";
  return {
    headers: {
      ...headers,
      accessToken: `AccessToken:${token}`,
    },
  };
});
const link = authLink.concat(httpLink);
const cache = new InMemoryCache();
const GQLClient = new ApolloClient({
  link,
  cache,
});
export default GQLClient;

// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { useContext } from "react";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// export const GQLClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
