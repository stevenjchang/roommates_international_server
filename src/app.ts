"use strict";

const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});

interface interfaceProps {
  a: string;
  b: number;
}
type TypeProp = {
  a: string;
  b: number;
};

const funt = ({ a, b }: interfaceProps) => {
  return a + b;
};
