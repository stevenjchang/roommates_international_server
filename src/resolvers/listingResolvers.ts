import { Listing } from "../models";

const listingResolvers = {
  Query: {
    listings: () => Listing.all(),
  },
};

export { listingResolvers };
