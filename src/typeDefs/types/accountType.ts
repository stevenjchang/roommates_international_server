import { gql } from "apollo-server";

const accountType = gql`
  type Account {
    account_id: Int
    username: String!
    email: String
  }
`;

export { accountType };
