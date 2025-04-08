import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Alert = {
  __typename?: 'Alert';
  changePercent?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  cryptoCurrency: CryptoCurrency;
  id: Scalars['ID']['output'];
  newPrice?: Maybe<Scalars['Float']['output']>;
  oldPrice?: Maybe<Scalars['Float']['output']>;
  symbol: Scalars['String']['output'];
  user: User;
};

export type CryptoCurrency = {
  __typename?: 'CryptoCurrency';
  ath?: Maybe<Scalars['Float']['output']>;
  athChangePercentage?: Maybe<Scalars['Float']['output']>;
  athDate?: Maybe<Scalars['String']['output']>;
  atl?: Maybe<Scalars['Float']['output']>;
  atlChangePercentage?: Maybe<Scalars['Float']['output']>;
  atlDate?: Maybe<Scalars['String']['output']>;
  circulatingSupply?: Maybe<Scalars['Float']['output']>;
  cryptoId: Scalars['String']['output'];
  currentPrice?: Maybe<Scalars['Float']['output']>;
  fullyDilutedValuation?: Maybe<Scalars['Float']['output']>;
  high24h?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  low24h?: Maybe<Scalars['Float']['output']>;
  marketCap?: Maybe<Scalars['Float']['output']>;
  marketCapChange24h?: Maybe<Scalars['Float']['output']>;
  marketCapChangePercentage24h?: Maybe<Scalars['Float']['output']>;
  marketCapRank?: Maybe<Scalars['Int']['output']>;
  maxSupply?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  priceChange24h?: Maybe<Scalars['Float']['output']>;
  priceChangePercentage24h?: Maybe<Scalars['Float']['output']>;
  symbol: Scalars['String']['output'];
  totalSupply?: Maybe<Scalars['Float']['output']>;
  totalVolume?: Maybe<Scalars['Float']['output']>;
};

export type CryptoPriceHistory = {
  __typename?: 'CryptoPriceHistory';
  cryptoId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  recordedAt?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export enum ExperienceLevel {
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

export enum Interest {
  Bitcoin = 'BITCOIN',
  Defi = 'DEFI',
  Ethereum = 'ETHEREUM',
  Mining = 'MINING',
  News = 'NEWS',
  Nfts = 'NFTS',
  Staking = 'STAKING',
  Trading = 'TRADING'
}

export type Mutation = {
  __typename?: 'Mutation';
  addSubscription?: Maybe<Subscription>;
};


export type MutationAddSubscriptionArgs = {
  cryptoId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAlertByUserId?: Maybe<Array<Maybe<Alert>>>;
  getAlerts?: Maybe<Array<Maybe<Alert>>>;
  getCryptoCurrencies?: Maybe<Array<Maybe<CryptoCurrency>>>;
  getCryptoCurrencyByCryptoId?: Maybe<CryptoCurrency>;
  getCryptoPriceHistory?: Maybe<Array<Maybe<CryptoPriceHistory>>>;
  getUserById?: Maybe<User>;
};


export type QueryGetAlertByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetCryptoCurrenciesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCryptoCurrencyByCryptoIdArgs = {
  cryptoId: Scalars['String']['input'];
};


export type QueryGetCryptoPriceHistoryArgs = {
  cryptoId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cryptoCurrency?: Maybe<CryptoCurrency>;
  id?: Maybe<Scalars['ID']['output']>;
  subscriptionDate?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  agreedToTerms: Scalars['Boolean']['output'];
  country: Scalars['String']['output'];
  dateOfBirth: Scalars['String']['output'];
  email: Scalars['String']['output'];
  experienceLevel: ExperienceLevel;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interests: Array<Interest>;
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  preferredCurrency: Scalars['String']['output'];
  receiveUpdates: Scalars['Boolean']['output'];
  subscriptions: Array<Subscription>;
};

export type GetCryptoCurrenciesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  orderBy: Scalars['String']['input'];
}>;


export type GetCryptoCurrenciesQuery = { __typename?: 'Query', getCryptoCurrencies?: Array<{ __typename?: 'CryptoCurrency', id: string, name: string, symbol: string, cryptoId: string, currentPrice?: number | null, priceChangePercentage24h?: number | null, marketCap?: number | null, totalVolume?: number | null, imageUrl?: string | null } | null> | null };

export type GetCryptoCurrencyByCryptoIdQueryVariables = Exact<{
  cryptoId: Scalars['String']['input'];
}>;


export type GetCryptoCurrencyByCryptoIdQuery = { __typename?: 'Query', getCryptoCurrencyByCryptoId?: { __typename?: 'CryptoCurrency', id: string, name: string, symbol: string, ath?: number | null, currentPrice?: number | null, priceChangePercentage24h?: number | null, marketCap?: number | null, marketCapChange24h?: number | null, circulatingSupply?: number | null, priceChange24h?: number | null, totalVolume?: number | null, imageUrl?: string | null } | null };

export type GetCryptoPriceHistoryQueryVariables = Exact<{
  cryptoId: Scalars['String']['input'];
}>;


export type GetCryptoPriceHistoryQuery = { __typename?: 'Query', getCryptoPriceHistory?: Array<{ __typename?: 'CryptoPriceHistory', price?: number | null, recordedAt?: string | null } | null> | null };

export type GetAlertByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetAlertByUserIdQuery = { __typename?: 'Query', getAlertByUserId?: Array<{ __typename?: 'Alert', id: string, symbol: string, changePercent?: number | null, oldPrice?: number | null, newPrice?: number | null, createdAt?: string | null } | null> | null };


export const GetCryptoCurrenciesDocument = gql`
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
    `;

/**
 * __useGetCryptoCurrenciesQuery__
 *
 * To run a query within a React component, call `useGetCryptoCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoCurrenciesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCryptoCurrenciesQuery(baseOptions: Apollo.QueryHookOptions<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables> & ({ variables: GetCryptoCurrenciesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>(GetCryptoCurrenciesDocument, options);
      }
export function useGetCryptoCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>(GetCryptoCurrenciesDocument, options);
        }
export function useGetCryptoCurrenciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>(GetCryptoCurrenciesDocument, options);
        }
export type GetCryptoCurrenciesQueryHookResult = ReturnType<typeof useGetCryptoCurrenciesQuery>;
export type GetCryptoCurrenciesLazyQueryHookResult = ReturnType<typeof useGetCryptoCurrenciesLazyQuery>;
export type GetCryptoCurrenciesSuspenseQueryHookResult = ReturnType<typeof useGetCryptoCurrenciesSuspenseQuery>;
export type GetCryptoCurrenciesQueryResult = Apollo.QueryResult<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>;
export const GetCryptoCurrencyByCryptoIdDocument = gql`
    query getCryptoCurrencyByCryptoId($cryptoId: String!) {
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
    `;

/**
 * __useGetCryptoCurrencyByCryptoIdQuery__
 *
 * To run a query within a React component, call `useGetCryptoCurrencyByCryptoIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoCurrencyByCryptoIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoCurrencyByCryptoIdQuery({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useGetCryptoCurrencyByCryptoIdQuery(baseOptions: Apollo.QueryHookOptions<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables> & ({ variables: GetCryptoCurrencyByCryptoIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>(GetCryptoCurrencyByCryptoIdDocument, options);
      }
export function useGetCryptoCurrencyByCryptoIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>(GetCryptoCurrencyByCryptoIdDocument, options);
        }
export function useGetCryptoCurrencyByCryptoIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>(GetCryptoCurrencyByCryptoIdDocument, options);
        }
export type GetCryptoCurrencyByCryptoIdQueryHookResult = ReturnType<typeof useGetCryptoCurrencyByCryptoIdQuery>;
export type GetCryptoCurrencyByCryptoIdLazyQueryHookResult = ReturnType<typeof useGetCryptoCurrencyByCryptoIdLazyQuery>;
export type GetCryptoCurrencyByCryptoIdSuspenseQueryHookResult = ReturnType<typeof useGetCryptoCurrencyByCryptoIdSuspenseQuery>;
export type GetCryptoCurrencyByCryptoIdQueryResult = Apollo.QueryResult<GetCryptoCurrencyByCryptoIdQuery, GetCryptoCurrencyByCryptoIdQueryVariables>;
export const GetCryptoPriceHistoryDocument = gql`
    query getCryptoPriceHistory($cryptoId: String!) {
  getCryptoPriceHistory(cryptoId: $cryptoId) {
    price
    recordedAt
  }
}
    `;

/**
 * __useGetCryptoPriceHistoryQuery__
 *
 * To run a query within a React component, call `useGetCryptoPriceHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoPriceHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoPriceHistoryQuery({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useGetCryptoPriceHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables> & ({ variables: GetCryptoPriceHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>(GetCryptoPriceHistoryDocument, options);
      }
export function useGetCryptoPriceHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>(GetCryptoPriceHistoryDocument, options);
        }
export function useGetCryptoPriceHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>(GetCryptoPriceHistoryDocument, options);
        }
export type GetCryptoPriceHistoryQueryHookResult = ReturnType<typeof useGetCryptoPriceHistoryQuery>;
export type GetCryptoPriceHistoryLazyQueryHookResult = ReturnType<typeof useGetCryptoPriceHistoryLazyQuery>;
export type GetCryptoPriceHistorySuspenseQueryHookResult = ReturnType<typeof useGetCryptoPriceHistorySuspenseQuery>;
export type GetCryptoPriceHistoryQueryResult = Apollo.QueryResult<GetCryptoPriceHistoryQuery, GetCryptoPriceHistoryQueryVariables>;
export const GetAlertByUserIdDocument = gql`
    query getAlertByUserId($userId: ID!) {
  getAlertByUserId(userId: $userId) {
    id
    symbol
    changePercent
    oldPrice
    newPrice
    createdAt
  }
}
    `;

/**
 * __useGetAlertByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAlertByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlertByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlertByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAlertByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables> & ({ variables: GetAlertByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>(GetAlertByUserIdDocument, options);
      }
export function useGetAlertByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>(GetAlertByUserIdDocument, options);
        }
export function useGetAlertByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>(GetAlertByUserIdDocument, options);
        }
export type GetAlertByUserIdQueryHookResult = ReturnType<typeof useGetAlertByUserIdQuery>;
export type GetAlertByUserIdLazyQueryHookResult = ReturnType<typeof useGetAlertByUserIdLazyQuery>;
export type GetAlertByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetAlertByUserIdSuspenseQuery>;
export type GetAlertByUserIdQueryResult = Apollo.QueryResult<GetAlertByUserIdQuery, GetAlertByUserIdQueryVariables>;