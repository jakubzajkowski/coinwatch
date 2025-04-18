import React, { useState } from 'react';
import styled from 'styled-components';
import {IoMdOptions} from "react-icons/io";
import Stats from '../components/cryptocurrency/Stats';
import { useQuery } from '@apollo/client';
import { PAGINATE_CRYPTO_CURRENCIES } from '../apollo/queries';
import { PaginateCryptoCurrenciesQuery } from '../graphql/generated';
import CryptoCurrencyTableRow from '../components/cryptocurrency/CryptoCurrencyTableRow';
import { ButtonSecondary } from '../components/styled';
import QueryBoundary from '../components/QueryBoundary';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
    padding: 5rem 1rem;
    color: ${({theme})=>theme.colors.primary};
    background-color: ${({theme})=>theme.colors.secondary};
`;

const Header = styled.h1`
  color: ${({theme})=>theme.colors.primary};
  margin-bottom: 30px;
`;

const SubHeader = styled.p`
  color: ${({theme})=>theme.colors.third};
  margin-bottom: 30px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgb(255,255,255,0.4);
  margin: 30px 0;
`;

const SectionHeader = styled.h2`
  color: ${({theme})=>theme.colors.third};
  margin-bottom: 20px;
`;

const FiltersSearch = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
`;

const Filter = styled.div`
    padding: 10px 16px;
    display: flex;
    gap: 0.2rem;
    align-items: center;
    border-radius: 0.5rem;
    border: 1px solid rgb(255,255,255,0.4);
    margin-bottom: 20px;
`

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid rgb(255,255,255,0.4);
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    background-color: ${({theme})=>theme.colors.secondary};
    color: ${({theme})=>theme.colors.primary};
  
    &:focus {
        outline: none;
    }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  color: ${({theme})=>theme.colors.primary};
  font-weight: normal;
  border-bottom: 1px solid rgb(255,255,255,0.4);
`;
const TableRow = styled.tr`
  &:hover {
    background-color: rgba(180, 180, 180, 0.1);
  }
`;

const PageButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PageInfo = styled.p`
  color: ${({theme})=>theme.colors.third};
`

const Cryptocurrency: React.FC = () => {
  const [page,setPage] = useState<number>(0);

  const { data, loading, error } = useQuery<PaginateCryptoCurrenciesQuery>(PAGINATE_CRYPTO_CURRENCIES, {
    variables: { page, size: 10, sort: "id" },
  });

  const handlePrevious = () => {
    if (page > 0) setPage(prev => prev - 1);
  };
  
  const handleNext = () => {
    if (data && page < data.paginateCryptoCurrencies.totalPages) {
      setPage(prev => prev + 1);
    }
  };
  

    return (
        <Container>
            <Header>Cryptocurrency Markets</Header>
            <SubHeader>Track prices, market cap, volume, and performance of thousands of cryptocurrencies</SubHeader>

            <Stats />

            <Divider />

            <SectionHeader>All Cryptocurrencies</SectionHeader>

            <FiltersSearch>
                <SearchInput placeholder="Search for a cryptocurrency..." />
                <Filter><IoMdOptions />Filters</Filter>
            </FiltersSearch>

            <Table>
                <thead>
                <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>Add to Watchlist</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>MarketCup</TableHeader>
                    <TableHeader>Price Change 24h</TableHeader>
                    <TableHeader>Highest Price 24h</TableHeader>
                    <TableHeader>Lowest Price 24h </TableHeader>
                    <TableHeader>MarketCup Rank</TableHeader>
                </TableRow>
                </thead>
                <tbody>
                  <QueryBoundary loading={loading} error={error}>
                    {data?.paginateCryptoCurrencies.content.map((crypto,index)=>{
                      const cryptoWithIndex = { ...crypto, index };
                      return <CryptoCurrencyTableRow key={crypto.cryptoId+index} data={cryptoWithIndex} />
                    })}
                  </QueryBoundary>
                </tbody>
            </Table>
            <PageButtonsContainer>
              <div>
                  <PageInfo>Showing 10 of {data?.paginateCryptoCurrencies.totalElements} cryptocurrencies</PageInfo>
              </div>
              <div>
                <ButtonSecondary type="button" disabled={page === 0} onClick={handlePrevious}>
                  Previous
                </ButtonSecondary>
                <ButtonSecondary type="button" disabled={page === data?.paginateCryptoCurrencies.totalPages} onClick={handleNext}>
                  Next
                </ButtonSecondary>
              </div>
            </PageButtonsContainer>
        </Container>
    );
};

export default Cryptocurrency;