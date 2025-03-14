import {gql} from "@apollo/client";

export const GET_CURRENCIES = gql`
  query getCryptoCurrencies {
    getCryptoCurrencies {
      id
      name
      symbol
      currentPrice
      marketCap
      lastUpdated
    }
  }
`