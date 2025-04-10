import {gql} from "@apollo/client";

export const GET_CURRENCIES_FOR_MARKETOVERVIEW =  gql`
  query getCryptoCurrencies($limit: Int!, $orderBy: String!) {
    getCryptoCurrencies(limit: $limit, orderBy: $orderBy) {
      id
      name
      symbol
      cryptoId
      currentPrice
      priceChangePercentage24h
      marketCap
      totalVolume
      imageUrl
    }
  }
`

export const GET_CURRENCIES_BY_ID_FOR_CRYPTO = gql`
  query getCryptoCurrencyByCryptoId($cryptoId: String!){
    getCryptoCurrencyByCryptoId(cryptoId: $cryptoId) {
      id
      name
      symbol
      ath
      currentPrice
      priceChangePercentage24h
      marketCap
      marketCapChange24h
      circulatingSupply
      priceChange24h
      totalVolume
      imageUrl
    }
  }
`

export const GET_CRYPTO_PRICE_HISTORY_FOR_CRYPTO = gql`
    query getCryptoPriceHistory($cryptoId: String!){
        getCryptoPriceHistory(cryptoId: $cryptoId) {
            price
            recordedAt
        }
    }
`

export const GET_ALERT_BY_USER_ID = gql`
    query getAlertByUserId($userId: ID!){
        getAlertByUserId(userId: $userId) {
            id
            symbol
            changePercent
            oldPrice
            newPrice
            createdAt
        }
    }
`
export const GET_SUBSCRIPTION_BY_USER_ID = gql`
    query getSubscriptionByUserId($userId: ID!){
        getSubscriptionByUserId(userId: $userId) {
            cryptoCurrency {
                cryptoId
                symbol
                imageUrl
            }
        }
    }
`


export const MUTATION_ADD_SUBSCRIPTION = gql`
    mutation AddSubscription($userId: ID!, $cryptoId: ID!) {
        addSubscription(userId: $userId, cryptoId: $cryptoId) {
            id
        }
    }
`