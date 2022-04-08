import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    categories {
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          items {
            value
            displayValue
            id
          }
          type
          name
          id
        }
        description
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
