"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksResolvers = void 0;
const models_1 = require("../models");
const booksResolvers = {
    Query: {
        books: () => models_1.Book.all(),
    },
};
exports.booksResolvers = booksResolvers;
//# sourceMappingURL=bookResolvers.js.map