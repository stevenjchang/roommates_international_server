"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const apollo_server_1 = require("apollo-server");
const query = apollo_server_1.gql `
  type Query {
    account: Account
    accounts: [Account]
    books: [Book]
    listing: Listing
    listings: [Listing]
  }
`;
exports.query = query;
//# sourceMappingURL=query.js.map