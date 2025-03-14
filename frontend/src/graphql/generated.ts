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

export type Query = {
  __typename?: 'Query';
  getCryptoCurrencies?: Maybe<Array<Maybe<CryptoCurrency>>>;
  getCryptoCurrencyByCryptoId?: Maybe<CryptoCurrency>;
};


export type QueryGetCryptoCurrencyByCryptoIdArgs = {
  cryptoId: Scalars['String']['input'];
};

export type GetCryptoCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCryptoCurrenciesQuery = { __typename?: 'Query', getCryptoCurrencies?: Array<{ __typename?: 'CryptoCurrency', id: string, name: string, symbol: string, currentPrice?: number | null, marketCap?: number | null, lastUpdated?: string | null } | null> | null };


export const GetCryptoCurrenciesDocument = gql`
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
 *   },
 * });
 */
export function useGetCryptoCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<GetCryptoCurrenciesQuery, GetCryptoCurrenciesQueryVariables>) {
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