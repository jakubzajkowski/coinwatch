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
                id
                cryptoId
                symbol
                imageUrl
            }
        }
    }
`
export const SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID = gql`
    query searchCryptoCurrencyByCryptoId($cryptoId: String!){
        searchCryptoCurrencyByCryptoId(cryptoId: $cryptoId) {
            id
            cryptoId
            symbol
            name
            imageUrl
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

export const MUTATION_DELETE_SUBSCRIPTION = gql`
    mutation DeleteSubscription($userId: ID!, $cryptoId: ID!) {
        deleteSubscription(userId: $userId, cryptoId: $cryptoId)
    }
`

export const GET_GLOBAL_MARKET = gql`
    query GetGlobalMarket {
        getGlobalMarket {
            id
            activeCryptocurrencies
            upcomingIcos
            ongoingIcos
            endedIcos
            markets
            marketCapChangePercentage24hUsd
            updatedAt
            totalMarketCap {
                currency
                amount
            }
            totalVolume {
                currency
                amount
            }
            marketCapPercentage {
                currency
                percentage
            }
        }
    }
`
export const PAGINATE_CRYPTO_CURRENCIES = gql`
    query PaginateCryptoCurrencies($page: Int, $size: Int, $sort: String)  {
        paginateCryptoCurrencies(page: $page, size: $size, sort: $sort) {
            totalPages
            totalElements
            currentPage
            content {
                id
                cryptoId
                symbol
                name
                imageUrl
                currentPrice
                marketCap
                marketCapRank
                fullyDilutedValuation
                totalVolume
                high24h
                low24h
                priceChange24h
                priceChangePercentage24h
                marketCapChange24h
                marketCapChangePercentage24h
                circulatingSupply
                totalSupply
                maxSupply
                ath
                athChangePercentage
                athDate
                atl
                atlChangePercentage
                atlDate
                lastUpdated
            }
        }
    }

`