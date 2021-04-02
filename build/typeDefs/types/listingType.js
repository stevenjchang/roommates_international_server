"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingType = void 0;
const apollo_server_1 = require("apollo-server");
const listingType = apollo_server_1.gql `
  type Listing {
    listing_id: Int
    title: String
    summary: String
    account_id: Int
    category_id: Int
  }
`;
exports.listingType = listingType;
//# sourceMappingURL=listingType.js.map