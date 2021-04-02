"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingResolvers = void 0;
const models_1 = require("../models");
const listingResolvers = {
    Query: {
        listings: () => models_1.Listing.all(),
    },
};
exports.listingResolvers = listingResolvers;
//# sourceMappingURL=listingResolvers.js.map