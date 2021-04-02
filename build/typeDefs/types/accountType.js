"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountType = void 0;
const apollo_server_1 = require("apollo-server");
const accountType = apollo_server_1.gql `
  type Account {
    account_id: Int
    username: String!
    email: String
  }
`;
exports.accountType = accountType;
//# sourceMappingURL=accountType.js.map