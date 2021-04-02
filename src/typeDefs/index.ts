import { query } from "./query";
import { accountType, bookType, listingType } from "./types";

const typeDefs = [query, accountType, bookType, listingType];

export { typeDefs };
