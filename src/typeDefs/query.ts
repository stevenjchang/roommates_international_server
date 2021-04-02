import { gql } from "apollo-server";

const query = gql`
  type Query {
    account: Account
    accounts: [Account]
    books: [Book]
    listing: Listing
    listings: [Listing]
  }
`;

export { query };
