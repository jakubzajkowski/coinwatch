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

export const GET_CRYPTO_PRICE_HISTORY_BY_RANGE_FOR_CRYPTO = gql`
    query getCryptoPriceHistoryByRange($cryptoId: String!,$range: String!){
        getCryptoPriceHistoryByRange(cryptoId: $cryptoId,range: $range) {
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

export const SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID_CRYPTOCURRENCIES = gql`
    query searchCryptoCurrencyByCryptoIdCryptoCurrencies($cryptoId: String!){
        searchCryptoCurrencyByCryptoId(cryptoId: $cryptoId) {
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
  query PaginateCryptoCurrencies(
    $page: Int,
    $size: Int,
    $sort: String,
    $order: String,
    $minPriceChange24h: Float,
    $maxPriceChange24h: Float,
    $minPrice: Float,
    $maxPrice: Float,
    $minMarketCap: Float,
    $maxMarketCap: Float,
    $minHighestPrice24h: Float,
    $maxHighestPrice24h: Float,
    $minLowestPrice24h: Float,
    $maxLowestPrice24h: Float
  ) {
    paginateCryptoCurrencies(
      page: $page,
      size: $size,
      sort: $sort,
      order: $order,
      minPriceChange24h: $minPriceChange24h,
      maxPriceChange24h: $maxPriceChange24h,
      minPrice: $minPrice,
      maxPrice: $maxPrice,
      minMarketCap: $minMarketCap,
      maxMarketCap: $maxMarketCap,
      minHighestPrice24h: $minHighestPrice24h,
      maxHighestPrice24h: $maxHighestPrice24h,
      minLowestPrice24h: $minLowestPrice24h,
      maxLowestPrice24h: $maxLowestPrice24h
    ) {
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
`;

export const IS_CRYPTO_FAVORITE = gql`
    query GetUserFavoriteCryptos($userId: ID!, $cryptoCurrencyId: ID!) {
        isCryptoFavorite(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId)
    }
`

export const ADD_FAVORITE_CRYPTO = gql`
    mutation AddFavoriteCrypto($userId: ID!, $cryptoCurrencyId: ID!) {
        addFavoriteCrypto(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId) {
            id
            addedAt
        }
    }
`

export const REMOVE_FAVORITE_CRYPTO = gql`
    mutation RemoveFavoriteCrypto($userId: ID!, $cryptoCurrencyId: ID!) {
        removeFavoriteCrypto(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId)
    }
`

export const GET_USER_FAVORITE_CRYPTO_FOR_ANALYSE = gql`
    query GetUserFavoriteCryptosForAnalyse($userId: ID!) {
        getUserFavoriteCryptos(userId: $userId) {
        cryptoCurrency {
            cryptoId
            symbol
        }
    }
}
`

export const START_AI_ANALYSE = gql`
    mutation StartAiAnalyse($cryptoId: String!, $userId: ID!) {
        startAiAnalyse(cryptoId: $cryptoId, userId: $userId)
    }
`

export const GET_CRYPTO_CHART_DATA = gql`
    query GetCryptoChartData($cryptoId: String!, $interval: String!, $from: String!, $to: String!, $chartType: ChartType!) {
        getCryptoChartData(
            cryptoId: $cryptoId
            interval: $interval
            from: $from
            to: $to
            chartType: $chartType
        ) {
            ... on CandleChartDTO {
                bucket
                open
                close
                high
                low
            }
            ... on AveragePricesDTO {
                bucket
                average
            }
        }
    }
`