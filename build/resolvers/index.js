"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const bookResolvers_1 = require("./bookResolvers");
const listingResolvers_1 = require("./listingResolvers");
const resolvers = [bookResolvers_1.booksResolvers, listingResolvers_1.listingResolvers];
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map