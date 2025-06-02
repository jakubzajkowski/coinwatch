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

export type CryptoCurrencyPage = {
  __typename?: 'CryptoCurrencyPage';
  content: Array<CryptoCurrency>;
  currentPage: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type CryptoPriceHistory = {
  __typename?: 'CryptoPriceHistory';
  cryptoId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  recordedAt?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type CurrencyPercentage = {
  __typename?: 'CurrencyPercentage';
  currency: Scalars['String']['output'];
  percentage?: Maybe<Scalars['Float']['output']>;
};

export type CurrencyValue = {
  __typename?: 'CurrencyValue';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
};

export enum Direction {
  Above = 'ABOVE',
  Below = 'BELOW'
}

export enum ExperienceLevel {
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

export type GlobalMarket = {
  __typename?: 'GlobalMarket';
  activeCryptocurrencies: Scalars['Int']['output'];
  endedIcos: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  marketCapChangePercentage24hUsd: Scalars['Float']['output'];
  marketCapPercentage: Array<CurrencyPercentage>;
  markets: Scalars['Int']['output'];
  ongoingIcos: Scalars['Int']['output'];
  totalMarketCap: Array<CurrencyValue>;
  totalVolume: Array<CurrencyValue>;
  upcomingIcos: Scalars['Int']['output'];
  updatedAt: Scalars['Float']['output'];
};

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
  addFavoriteCrypto?: Maybe<UserFavoriteCrypto>;
  addSubscription?: Maybe<Subscription>;
  createUserCryptoTrigger: UserCryptoTrigger;
  deleteSubscription?: Maybe<Scalars['Boolean']['output']>;
  removeFavoriteCrypto?: Maybe<Scalars['Boolean']['output']>;
  startAiAnalyse: Scalars['String']['output'];
};


export type MutationAddFavoriteCryptoArgs = {
  cryptoCurrencyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddSubscriptionArgs = {
  cryptoId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserCryptoTriggerArgs = {
  cryptoCurrencyId: Scalars['ID']['input'];
  direction: Direction;
  targetPrice: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteSubscriptionArgs = {
  cryptoId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveFavoriteCryptoArgs = {
  cryptoCurrencyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationStartAiAnalyseArgs = {
  cryptoId: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAlertByUserId?: Maybe<Array<Maybe<Alert>>>;
  getAlerts?: Maybe<Array<Maybe<Alert>>>;
  getCryptoCurrencies?: Maybe<Array<Maybe<CryptoCurrency>>>;
  getCryptoCurrencyByCryptoId?: Maybe<CryptoCurrency>;
  getCryptoPriceHistory?: Maybe<Array<Maybe<CryptoPriceHistory>>>;
  getCryptoPriceHistoryByRange?: Maybe<Array<Maybe<CryptoPriceHistory>>>;
  getGlobalMarket?: Maybe<GlobalMarket>;
  getSubscriptionByUserId?: Maybe<Array<Maybe<Subscription>>>;
  getUserById?: Maybe<User>;
  getUserFavoriteCryptos?: Maybe<Array<Maybe<UserFavoriteCrypto>>>;
  isCryptoFavorite: Scalars['Boolean']['output'];
  paginateCryptoCurrencies: CryptoCurrencyPage;
  searchCryptoCurrencyByCryptoId?: Maybe<Array<Maybe<CryptoCurrency>>>;
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


export type QueryGetCryptoPriceHistoryByRangeArgs = {
  cryptoId: Scalars['String']['input'];
  range: Scalars['String']['input'];
};


export type QueryGetSubscriptionByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserFavoriteCryptosArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryIsCryptoFavoriteArgs = {
  cryptoCurrencyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryPaginateCryptoCurrenciesArgs = {
  maxHighestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  maxLowestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  maxMarketCap?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPriceChange24h?: InputMaybe<Scalars['Float']['input']>;
  minHighestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  minLowestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  minMarketCap?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minPriceChange24h?: InputMaybe<Scalars['Float']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchCryptoCurrencyByCryptoIdArgs = {
  cryptoId: Scalars['String']['input'];
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

export type UserCryptoTrigger = {
  __typename?: 'UserCryptoTrigger';
  cryptoCurrency: CryptoCurrency;
  direction: Direction;
  id: Scalars['ID']['output'];
  targetPrice: Scalars['Float']['output'];
  triggered: Scalars['Boolean']['output'];
  user: User;
};

export type UserFavoriteCrypto = {
  __typename?: 'UserFavoriteCrypto';
  addedAt: Scalars['String']['output'];
  cryptoCurrency: CryptoCurrency;
  id: Scalars['ID']['output'];
  user: User;
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

export type GetCryptoPriceHistoryByRangeQueryVariables = Exact<{
  cryptoId: Scalars['String']['input'];
  range: Scalars['String']['input'];
}>;


export type GetCryptoPriceHistoryByRangeQuery = { __typename?: 'Query', getCryptoPriceHistoryByRange?: Array<{ __typename?: 'CryptoPriceHistory', price?: number | null, recordedAt?: string | null } | null> | null };

export type GetAlertByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetAlertByUserIdQuery = { __typename?: 'Query', getAlertByUserId?: Array<{ __typename?: 'Alert', id: string, symbol: string, changePercent?: number | null, oldPrice?: number | null, newPrice?: number | null, createdAt?: string | null } | null> | null };

export type GetSubscriptionByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetSubscriptionByUserIdQuery = { __typename?: 'Query', getSubscriptionByUserId?: Array<{ __typename?: 'Subscription', cryptoCurrency?: { __typename?: 'CryptoCurrency', id: string, cryptoId: string, symbol: string, imageUrl?: string | null } | null } | null> | null };

export type SearchCryptoCurrencyByCryptoIdQueryVariables = Exact<{
  cryptoId: Scalars['String']['input'];
}>;


export type SearchCryptoCurrencyByCryptoIdQuery = { __typename?: 'Query', searchCryptoCurrencyByCryptoId?: Array<{ __typename?: 'CryptoCurrency', id: string, cryptoId: string, symbol: string, name: string, imageUrl?: string | null } | null> | null };

export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables = Exact<{
  cryptoId: Scalars['String']['input'];
}>;


export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery = { __typename?: 'Query', searchCryptoCurrencyByCryptoId?: Array<{ __typename?: 'CryptoCurrency', id: string, cryptoId: string, symbol: string, name: string, imageUrl?: string | null, currentPrice?: number | null, marketCap?: number | null, marketCapRank?: number | null, fullyDilutedValuation?: number | null, totalVolume?: number | null, high24h?: number | null, low24h?: number | null, priceChange24h?: number | null, priceChangePercentage24h?: number | null, marketCapChange24h?: number | null, marketCapChangePercentage24h?: number | null, circulatingSupply?: number | null, totalSupply?: number | null, maxSupply?: number | null, ath?: number | null, athChangePercentage?: number | null, athDate?: string | null, atl?: number | null, atlChangePercentage?: number | null, atlDate?: string | null, lastUpdated?: string | null } | null> | null };

export type AddSubscriptionMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  cryptoId: Scalars['ID']['input'];
}>;


export type AddSubscriptionMutation = { __typename?: 'Mutation', addSubscription?: { __typename?: 'Subscription', id?: string | null } | null };

export type DeleteSubscriptionMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  cryptoId: Scalars['ID']['input'];
}>;


export type DeleteSubscriptionMutation = { __typename?: 'Mutation', deleteSubscription?: boolean | null };

export type GetGlobalMarketQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalMarketQuery = { __typename?: 'Query', getGlobalMarket?: { __typename?: 'GlobalMarket', id: string, activeCryptocurrencies: number, upcomingIcos: number, ongoingIcos: number, endedIcos: number, markets: number, marketCapChangePercentage24hUsd: number, updatedAt: number, totalMarketCap: Array<{ __typename?: 'CurrencyValue', currency: string, amount: number }>, totalVolume: Array<{ __typename?: 'CurrencyValue', currency: string, amount: number }>, marketCapPercentage: Array<{ __typename?: 'CurrencyPercentage', currency: string, percentage?: number | null }> } | null };

export type PaginateCryptoCurrenciesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  minPriceChange24h?: InputMaybe<Scalars['Float']['input']>;
  maxPriceChange24h?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minMarketCap?: InputMaybe<Scalars['Float']['input']>;
  maxMarketCap?: InputMaybe<Scalars['Float']['input']>;
  minHighestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  maxHighestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  minLowestPrice24h?: InputMaybe<Scalars['Float']['input']>;
  maxLowestPrice24h?: InputMaybe<Scalars['Float']['input']>;
}>;


export type PaginateCryptoCurrenciesQuery = { __typename?: 'Query', paginateCryptoCurrencies: { __typename?: 'CryptoCurrencyPage', totalPages: number, totalElements: number, currentPage: number, content: Array<{ __typename?: 'CryptoCurrency', id: string, cryptoId: string, symbol: string, name: string, imageUrl?: string | null, currentPrice?: number | null, marketCap?: number | null, marketCapRank?: number | null, fullyDilutedValuation?: number | null, totalVolume?: number | null, high24h?: number | null, low24h?: number | null, priceChange24h?: number | null, priceChangePercentage24h?: number | null, marketCapChange24h?: number | null, marketCapChangePercentage24h?: number | null, circulatingSupply?: number | null, totalSupply?: number | null, maxSupply?: number | null, ath?: number | null, athChangePercentage?: number | null, athDate?: string | null, atl?: number | null, atlChangePercentage?: number | null, atlDate?: string | null, lastUpdated?: string | null }> } };

export type GetUserFavoriteCryptosQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  cryptoCurrencyId: Scalars['ID']['input'];
}>;


export type GetUserFavoriteCryptosQuery = { __typename?: 'Query', isCryptoFavorite: boolean };

export type AddFavoriteCryptoMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  cryptoCurrencyId: Scalars['ID']['input'];
}>;


export type AddFavoriteCryptoMutation = { __typename?: 'Mutation', addFavoriteCrypto?: { __typename?: 'UserFavoriteCrypto', id: string, addedAt: string } | null };

export type RemoveFavoriteCryptoMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  cryptoCurrencyId: Scalars['ID']['input'];
}>;


export type RemoveFavoriteCryptoMutation = { __typename?: 'Mutation', removeFavoriteCrypto?: boolean | null };

export type GetUserFavoriteCryptosForAnalyseQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserFavoriteCryptosForAnalyseQuery = { __typename?: 'Query', getUserFavoriteCryptos?: Array<{ __typename?: 'UserFavoriteCrypto', cryptoCurrency: { __typename?: 'CryptoCurrency', cryptoId: string, symbol: string } } | null> | null };

export type StartAiAnalyseMutationVariables = Exact<{
  cryptoId: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;


export type StartAiAnalyseMutation = { __typename?: 'Mutation', startAiAnalyse: string };


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
export const GetCryptoPriceHistoryByRangeDocument = gql`
    query getCryptoPriceHistoryByRange($cryptoId: String!, $range: String!) {
  getCryptoPriceHistoryByRange(cryptoId: $cryptoId, range: $range) {
    price
    recordedAt
  }
}
    `;

/**
 * __useGetCryptoPriceHistoryByRangeQuery__
 *
 * To run a query within a React component, call `useGetCryptoPriceHistoryByRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoPriceHistoryByRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCryptoPriceHistoryByRangeQuery({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useGetCryptoPriceHistoryByRangeQuery(baseOptions: Apollo.QueryHookOptions<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables> & ({ variables: GetCryptoPriceHistoryByRangeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>(GetCryptoPriceHistoryByRangeDocument, options);
      }
export function useGetCryptoPriceHistoryByRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>(GetCryptoPriceHistoryByRangeDocument, options);
        }
export function useGetCryptoPriceHistoryByRangeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>(GetCryptoPriceHistoryByRangeDocument, options);
        }
export type GetCryptoPriceHistoryByRangeQueryHookResult = ReturnType<typeof useGetCryptoPriceHistoryByRangeQuery>;
export type GetCryptoPriceHistoryByRangeLazyQueryHookResult = ReturnType<typeof useGetCryptoPriceHistoryByRangeLazyQuery>;
export type GetCryptoPriceHistoryByRangeSuspenseQueryHookResult = ReturnType<typeof useGetCryptoPriceHistoryByRangeSuspenseQuery>;
export type GetCryptoPriceHistoryByRangeQueryResult = Apollo.QueryResult<GetCryptoPriceHistoryByRangeQuery, GetCryptoPriceHistoryByRangeQueryVariables>;
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
export const GetSubscriptionByUserIdDocument = gql`
    query getSubscriptionByUserId($userId: ID!) {
  getSubscriptionByUserId(userId: $userId) {
    cryptoCurrency {
      id
      cryptoId
      symbol
      imageUrl
    }
  }
}
    `;

/**
 * __useGetSubscriptionByUserIdQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSubscriptionByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables> & ({ variables: GetSubscriptionByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>(GetSubscriptionByUserIdDocument, options);
      }
export function useGetSubscriptionByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>(GetSubscriptionByUserIdDocument, options);
        }
export function useGetSubscriptionByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>(GetSubscriptionByUserIdDocument, options);
        }
export type GetSubscriptionByUserIdQueryHookResult = ReturnType<typeof useGetSubscriptionByUserIdQuery>;
export type GetSubscriptionByUserIdLazyQueryHookResult = ReturnType<typeof useGetSubscriptionByUserIdLazyQuery>;
export type GetSubscriptionByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionByUserIdSuspenseQuery>;
export type GetSubscriptionByUserIdQueryResult = Apollo.QueryResult<GetSubscriptionByUserIdQuery, GetSubscriptionByUserIdQueryVariables>;
export const SearchCryptoCurrencyByCryptoIdDocument = gql`
    query searchCryptoCurrencyByCryptoId($cryptoId: String!) {
  searchCryptoCurrencyByCryptoId(cryptoId: $cryptoId) {
    id
    cryptoId
    symbol
    name
    imageUrl
  }
}
    `;

/**
 * __useSearchCryptoCurrencyByCryptoIdQuery__
 *
 * To run a query within a React component, call `useSearchCryptoCurrencyByCryptoIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCryptoCurrencyByCryptoIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCryptoCurrencyByCryptoIdQuery({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useSearchCryptoCurrencyByCryptoIdQuery(baseOptions: Apollo.QueryHookOptions<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables> & ({ variables: SearchCryptoCurrencyByCryptoIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>(SearchCryptoCurrencyByCryptoIdDocument, options);
      }
export function useSearchCryptoCurrencyByCryptoIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>(SearchCryptoCurrencyByCryptoIdDocument, options);
        }
export function useSearchCryptoCurrencyByCryptoIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>(SearchCryptoCurrencyByCryptoIdDocument, options);
        }
export type SearchCryptoCurrencyByCryptoIdQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdQuery>;
export type SearchCryptoCurrencyByCryptoIdLazyQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdLazyQuery>;
export type SearchCryptoCurrencyByCryptoIdSuspenseQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdSuspenseQuery>;
export type SearchCryptoCurrencyByCryptoIdQueryResult = Apollo.QueryResult<SearchCryptoCurrencyByCryptoIdQuery, SearchCryptoCurrencyByCryptoIdQueryVariables>;
export const SearchCryptoCurrencyByCryptoIdCryptoCurrenciesDocument = gql`
    query searchCryptoCurrencyByCryptoIdCryptoCurrencies($cryptoId: String!) {
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
    `;

/**
 * __useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery__
 *
 * To run a query within a React component, call `useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery(baseOptions: Apollo.QueryHookOptions<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables> & ({ variables: SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>(SearchCryptoCurrencyByCryptoIdCryptoCurrenciesDocument, options);
      }
export function useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>(SearchCryptoCurrencyByCryptoIdCryptoCurrenciesDocument, options);
        }
export function useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>(SearchCryptoCurrencyByCryptoIdCryptoCurrenciesDocument, options);
        }
export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery>;
export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesLazyQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesLazyQuery>;
export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesSuspenseQueryHookResult = ReturnType<typeof useSearchCryptoCurrencyByCryptoIdCryptoCurrenciesSuspenseQuery>;
export type SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryResult = Apollo.QueryResult<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery, SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQueryVariables>;
export const AddSubscriptionDocument = gql`
    mutation AddSubscription($userId: ID!, $cryptoId: ID!) {
  addSubscription(userId: $userId, cryptoId: $cryptoId) {
    id
  }
}
    `;
export type AddSubscriptionMutationFn = Apollo.MutationFunction<AddSubscriptionMutation, AddSubscriptionMutationVariables>;

/**
 * __useAddSubscriptionMutation__
 *
 * To run a mutation, you first call `useAddSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubscriptionMutation, { data, loading, error }] = useAddSubscriptionMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useAddSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<AddSubscriptionMutation, AddSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubscriptionMutation, AddSubscriptionMutationVariables>(AddSubscriptionDocument, options);
      }
export type AddSubscriptionMutationHookResult = ReturnType<typeof useAddSubscriptionMutation>;
export type AddSubscriptionMutationResult = Apollo.MutationResult<AddSubscriptionMutation>;
export type AddSubscriptionMutationOptions = Apollo.BaseMutationOptions<AddSubscriptionMutation, AddSubscriptionMutationVariables>;
export const DeleteSubscriptionDocument = gql`
    mutation DeleteSubscription($userId: ID!, $cryptoId: ID!) {
  deleteSubscription(userId: $userId, cryptoId: $cryptoId)
}
    `;
export type DeleteSubscriptionMutationFn = Apollo.MutationFunction<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;

/**
 * __useDeleteSubscriptionMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionMutation, { data, loading, error }] = useDeleteSubscriptionMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      cryptoId: // value for 'cryptoId'
 *   },
 * });
 */
export function useDeleteSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>(DeleteSubscriptionDocument, options);
      }
export type DeleteSubscriptionMutationHookResult = ReturnType<typeof useDeleteSubscriptionMutation>;
export type DeleteSubscriptionMutationResult = Apollo.MutationResult<DeleteSubscriptionMutation>;
export type DeleteSubscriptionMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionMutation, DeleteSubscriptionMutationVariables>;
export const GetGlobalMarketDocument = gql`
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
    `;

/**
 * __useGetGlobalMarketQuery__
 *
 * To run a query within a React component, call `useGetGlobalMarketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalMarketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalMarketQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGlobalMarketQuery(baseOptions?: Apollo.QueryHookOptions<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>(GetGlobalMarketDocument, options);
      }
export function useGetGlobalMarketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>(GetGlobalMarketDocument, options);
        }
export function useGetGlobalMarketSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>(GetGlobalMarketDocument, options);
        }
export type GetGlobalMarketQueryHookResult = ReturnType<typeof useGetGlobalMarketQuery>;
export type GetGlobalMarketLazyQueryHookResult = ReturnType<typeof useGetGlobalMarketLazyQuery>;
export type GetGlobalMarketSuspenseQueryHookResult = ReturnType<typeof useGetGlobalMarketSuspenseQuery>;
export type GetGlobalMarketQueryResult = Apollo.QueryResult<GetGlobalMarketQuery, GetGlobalMarketQueryVariables>;
export const PaginateCryptoCurrenciesDocument = gql`
    query PaginateCryptoCurrencies($page: Int, $size: Int, $sort: String, $order: String, $minPriceChange24h: Float, $maxPriceChange24h: Float, $minPrice: Float, $maxPrice: Float, $minMarketCap: Float, $maxMarketCap: Float, $minHighestPrice24h: Float, $maxHighestPrice24h: Float, $minLowestPrice24h: Float, $maxLowestPrice24h: Float) {
  paginateCryptoCurrencies(
    page: $page
    size: $size
    sort: $sort
    order: $order
    minPriceChange24h: $minPriceChange24h
    maxPriceChange24h: $maxPriceChange24h
    minPrice: $minPrice
    maxPrice: $maxPrice
    minMarketCap: $minMarketCap
    maxMarketCap: $maxMarketCap
    minHighestPrice24h: $minHighestPrice24h
    maxHighestPrice24h: $maxHighestPrice24h
    minLowestPrice24h: $minLowestPrice24h
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

/**
 * __usePaginateCryptoCurrenciesQuery__
 *
 * To run a query within a React component, call `usePaginateCryptoCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginateCryptoCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginateCryptoCurrenciesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      sort: // value for 'sort'
 *      order: // value for 'order'
 *      minPriceChange24h: // value for 'minPriceChange24h'
 *      maxPriceChange24h: // value for 'maxPriceChange24h'
 *      minPrice: // value for 'minPrice'
 *      maxPrice: // value for 'maxPrice'
 *      minMarketCap: // value for 'minMarketCap'
 *      maxMarketCap: // value for 'maxMarketCap'
 *      minHighestPrice24h: // value for 'minHighestPrice24h'
 *      maxHighestPrice24h: // value for 'maxHighestPrice24h'
 *      minLowestPrice24h: // value for 'minLowestPrice24h'
 *      maxLowestPrice24h: // value for 'maxLowestPrice24h'
 *   },
 * });
 */
export function usePaginateCryptoCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>(PaginateCryptoCurrenciesDocument, options);
      }
export function usePaginateCryptoCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>(PaginateCryptoCurrenciesDocument, options);
        }
export function usePaginateCryptoCurrenciesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>(PaginateCryptoCurrenciesDocument, options);
        }
export type PaginateCryptoCurrenciesQueryHookResult = ReturnType<typeof usePaginateCryptoCurrenciesQuery>;
export type PaginateCryptoCurrenciesLazyQueryHookResult = ReturnType<typeof usePaginateCryptoCurrenciesLazyQuery>;
export type PaginateCryptoCurrenciesSuspenseQueryHookResult = ReturnType<typeof usePaginateCryptoCurrenciesSuspenseQuery>;
export type PaginateCryptoCurrenciesQueryResult = Apollo.QueryResult<PaginateCryptoCurrenciesQuery, PaginateCryptoCurrenciesQueryVariables>;
export const GetUserFavoriteCryptosDocument = gql`
    query GetUserFavoriteCryptos($userId: ID!, $cryptoCurrencyId: ID!) {
  isCryptoFavorite(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId)
}
    `;

/**
 * __useGetUserFavoriteCryptosQuery__
 *
 * To run a query within a React component, call `useGetUserFavoriteCryptosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavoriteCryptosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavoriteCryptosQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cryptoCurrencyId: // value for 'cryptoCurrencyId'
 *   },
 * });
 */
export function useGetUserFavoriteCryptosQuery(baseOptions: Apollo.QueryHookOptions<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables> & ({ variables: GetUserFavoriteCryptosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>(GetUserFavoriteCryptosDocument, options);
      }
export function useGetUserFavoriteCryptosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>(GetUserFavoriteCryptosDocument, options);
        }
export function useGetUserFavoriteCryptosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>(GetUserFavoriteCryptosDocument, options);
        }
export type GetUserFavoriteCryptosQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosQuery>;
export type GetUserFavoriteCryptosLazyQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosLazyQuery>;
export type GetUserFavoriteCryptosSuspenseQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosSuspenseQuery>;
export type GetUserFavoriteCryptosQueryResult = Apollo.QueryResult<GetUserFavoriteCryptosQuery, GetUserFavoriteCryptosQueryVariables>;
export const AddFavoriteCryptoDocument = gql`
    mutation AddFavoriteCrypto($userId: ID!, $cryptoCurrencyId: ID!) {
  addFavoriteCrypto(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId) {
    id
    addedAt
  }
}
    `;
export type AddFavoriteCryptoMutationFn = Apollo.MutationFunction<AddFavoriteCryptoMutation, AddFavoriteCryptoMutationVariables>;

/**
 * __useAddFavoriteCryptoMutation__
 *
 * To run a mutation, you first call `useAddFavoriteCryptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavoriteCryptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavoriteCryptoMutation, { data, loading, error }] = useAddFavoriteCryptoMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      cryptoCurrencyId: // value for 'cryptoCurrencyId'
 *   },
 * });
 */
export function useAddFavoriteCryptoMutation(baseOptions?: Apollo.MutationHookOptions<AddFavoriteCryptoMutation, AddFavoriteCryptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavoriteCryptoMutation, AddFavoriteCryptoMutationVariables>(AddFavoriteCryptoDocument, options);
      }
export type AddFavoriteCryptoMutationHookResult = ReturnType<typeof useAddFavoriteCryptoMutation>;
export type AddFavoriteCryptoMutationResult = Apollo.MutationResult<AddFavoriteCryptoMutation>;
export type AddFavoriteCryptoMutationOptions = Apollo.BaseMutationOptions<AddFavoriteCryptoMutation, AddFavoriteCryptoMutationVariables>;
export const RemoveFavoriteCryptoDocument = gql`
    mutation RemoveFavoriteCrypto($userId: ID!, $cryptoCurrencyId: ID!) {
  removeFavoriteCrypto(userId: $userId, cryptoCurrencyId: $cryptoCurrencyId)
}
    `;
export type RemoveFavoriteCryptoMutationFn = Apollo.MutationFunction<RemoveFavoriteCryptoMutation, RemoveFavoriteCryptoMutationVariables>;

/**
 * __useRemoveFavoriteCryptoMutation__
 *
 * To run a mutation, you first call `useRemoveFavoriteCryptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavoriteCryptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavoriteCryptoMutation, { data, loading, error }] = useRemoveFavoriteCryptoMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      cryptoCurrencyId: // value for 'cryptoCurrencyId'
 *   },
 * });
 */
export function useRemoveFavoriteCryptoMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFavoriteCryptoMutation, RemoveFavoriteCryptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFavoriteCryptoMutation, RemoveFavoriteCryptoMutationVariables>(RemoveFavoriteCryptoDocument, options);
      }
export type RemoveFavoriteCryptoMutationHookResult = ReturnType<typeof useRemoveFavoriteCryptoMutation>;
export type RemoveFavoriteCryptoMutationResult = Apollo.MutationResult<RemoveFavoriteCryptoMutation>;
export type RemoveFavoriteCryptoMutationOptions = Apollo.BaseMutationOptions<RemoveFavoriteCryptoMutation, RemoveFavoriteCryptoMutationVariables>;
export const GetUserFavoriteCryptosForAnalyseDocument = gql`
    query GetUserFavoriteCryptosForAnalyse($userId: ID!) {
  getUserFavoriteCryptos(userId: $userId) {
    cryptoCurrency {
      cryptoId
      symbol
    }
  }
}
    `;

/**
 * __useGetUserFavoriteCryptosForAnalyseQuery__
 *
 * To run a query within a React component, call `useGetUserFavoriteCryptosForAnalyseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavoriteCryptosForAnalyseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavoriteCryptosForAnalyseQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFavoriteCryptosForAnalyseQuery(baseOptions: Apollo.QueryHookOptions<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables> & ({ variables: GetUserFavoriteCryptosForAnalyseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>(GetUserFavoriteCryptosForAnalyseDocument, options);
      }
export function useGetUserFavoriteCryptosForAnalyseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>(GetUserFavoriteCryptosForAnalyseDocument, options);
        }
export function useGetUserFavoriteCryptosForAnalyseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>(GetUserFavoriteCryptosForAnalyseDocument, options);
        }
export type GetUserFavoriteCryptosForAnalyseQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosForAnalyseQuery>;
export type GetUserFavoriteCryptosForAnalyseLazyQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosForAnalyseLazyQuery>;
export type GetUserFavoriteCryptosForAnalyseSuspenseQueryHookResult = ReturnType<typeof useGetUserFavoriteCryptosForAnalyseSuspenseQuery>;
export type GetUserFavoriteCryptosForAnalyseQueryResult = Apollo.QueryResult<GetUserFavoriteCryptosForAnalyseQuery, GetUserFavoriteCryptosForAnalyseQueryVariables>;
export const StartAiAnalyseDocument = gql`
    mutation StartAiAnalyse($cryptoId: String!, $userId: ID!) {
  startAiAnalyse(cryptoId: $cryptoId, userId: $userId)
}
    `;
export type StartAiAnalyseMutationFn = Apollo.MutationFunction<StartAiAnalyseMutation, StartAiAnalyseMutationVariables>;

/**
 * __useStartAiAnalyseMutation__
 *
 * To run a mutation, you first call `useStartAiAnalyseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAiAnalyseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAiAnalyseMutation, { data, loading, error }] = useStartAiAnalyseMutation({
 *   variables: {
 *      cryptoId: // value for 'cryptoId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useStartAiAnalyseMutation(baseOptions?: Apollo.MutationHookOptions<StartAiAnalyseMutation, StartAiAnalyseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartAiAnalyseMutation, StartAiAnalyseMutationVariables>(StartAiAnalyseDocument, options);
      }
export type StartAiAnalyseMutationHookResult = ReturnType<typeof useStartAiAnalyseMutation>;
export type StartAiAnalyseMutationResult = Apollo.MutationResult<StartAiAnalyseMutation>;
export type StartAiAnalyseMutationOptions = Apollo.BaseMutationOptions<StartAiAnalyseMutation, StartAiAnalyseMutationVariables>;