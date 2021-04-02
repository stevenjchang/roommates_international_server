"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookType = void 0;
const apollo_server_1 = require("apollo-server");
const bookType = apollo_server_1.gql `
  type Book {
    title: String
    author: String
  }
`;
exports.bookType = bookType;
//# sourceMappingURL=bookType.js.map