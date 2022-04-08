import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query Query {
    currencies {
      label
      symbol
    }
  }
`;
