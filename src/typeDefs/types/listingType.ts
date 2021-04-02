import { gql } from "apollo-server";

const listingType = gql`
  type Listing {
    listing_id: Int
    title: String
    summary: String
    account_id: Int
    category_id: Int
  }
`;

export { listingType };
