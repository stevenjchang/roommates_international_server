"use strict";
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = require("./typeDefs").typeDefs;
var resolvers = require("./resolvers").resolvers;
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var funt = function (_a) {
    var a = _a.a, b = _a.b;
    return a + b;
};
