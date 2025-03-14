import {gql} from "@apollo/client";

export const GET_CURRENCIES_FOR_MARKETOVERVIEW =  gql`
  query getCryptoCurrencies($limit: Int!, $orderBy: String!) {
    getCryptoCurrencies(limit: $limit, orderBy: $orderBy) {
      id
      name
      symbol
      currentPrice
      priceChangePercentage24h
      marketCap
      totalVolume
      imageUrl
    }
  }
`