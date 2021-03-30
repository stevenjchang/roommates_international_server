import { gql } from "apollo-server";

const query = gql`
  type Query {
    books: [Book]
  }
`;

export { query };
