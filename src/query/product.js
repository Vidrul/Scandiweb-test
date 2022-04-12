import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query ($input: String!) {
    category(input: { title: $input }) {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          type
          name
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query ($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      brand
    }
  }
`;
