import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdOptions } from "react-icons/io";
import Stats from '../components/cryptocurrency/Stats';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  PAGINATE_CRYPTO_CURRENCIES,
  SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID_CRYPTOCURRENCIES
} from '../apollo/queries';
import {
  PaginateCryptoCurrenciesQuery,
  SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery
} from '../graphql/generated';
import CryptoCurrencyTableRow from '../components/cryptocurrency/CryptoCurrencyTableRow';
import { ButtonSecondary } from '../components/styled';
import QueryBoundary from '../components/QueryBoundary';
import { useDebounce } from '../hooks/useBebounce';
import FiltersModal from '../components/cryptocurrency/FiltersModal';
import { useTranslation } from 'react-i18next';

export interface CryptoCurrencyFiltersType {
  sort: string | null;
  order: string | null;
  minPriceChange24h: number | null;
  maxPriceChange24h: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  minMarketCap: number | null;
  maxMarketCap: number | null;
  minHighestPrice24h: number | null;
  maxHighestPrice24h: number | null;
  minLowestPrice24h: number | null;
  maxLowestPrice24h: number | null;
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 5rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 30px;
`;

const SubHeader = styled.p`
  color: ${({ theme }) => theme.colors.third};
  margin-bottom: 30px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgb(255,255,255,0.4);
  margin: 30px 0;
`;

const SectionHeader = styled.h2`
  color: ${({ theme }) => theme.colors.third};
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
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid rgb(255,255,255,0.4);
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};

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
  color: ${({ theme }) => theme.colors.primary};
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
`;

const PageInfo = styled.p`
  color: ${({ theme }) => theme.colors.third};
`;

const Cryptocurrency: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const isSearching = debouncedSearch.trim().length > 1;
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<CryptoCurrencyFiltersType>({
    sort: 'id',
    order: 'asc',
    minPriceChange24h: null,
    maxPriceChange24h: null,
    minPrice: null,
    maxPrice: null,
    minMarketCap: null,
    maxMarketCap: null,
    minHighestPrice24h: null,
    maxHighestPrice24h: null,
    minLowestPrice24h: null,
    maxLowestPrice24h: null,
  });

  const { data: paginateData, loading: paginateLoading, error: paginateError, refetch } =
    useQuery<PaginateCryptoCurrenciesQuery>(PAGINATE_CRYPTO_CURRENCIES, {
      variables: { page, size: 10, ...filters },
    });

  const [fetchSearch, { data: searchData, loading: searchLoading, error: searchError }] =
    useLazyQuery<SearchCryptoCurrencyByCryptoIdCryptoCurrenciesQuery>(
      SEARCH_CRYPTO_CURRENCIES_BY_CRYPTO_ID_CRYPTOCURRENCIES
    );

  useEffect(() => {
    if (debouncedSearch.trim().length > 1) {
      fetchSearch({ variables: { cryptoId: debouncedSearch.trim() } });
    }
  }, [debouncedSearch]);

  const handleFilters = (filtersFormState: CryptoCurrencyFiltersType) => {
    setFilters(filtersFormState);
    setPage(0);
  };

  useEffect(() => {
    refetch({
      page: page,
      size: 10,
      ...filters,
    });
  }, [filters]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleNext = () => {
    if (paginateData && page < paginateData.paginateCryptoCurrencies.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const cryptoData = isSearching
    ? searchData?.searchCryptoCurrencyByCryptoId ?? []
    : paginateData?.paginateCryptoCurrencies.content ?? [];
  const totalElements = isSearching
    ? cryptoData.length
    : paginateData?.paginateCryptoCurrencies.totalElements ?? 0;
  const totalPages = paginateData?.paginateCryptoCurrencies.totalPages ?? 1;

  return (
    <Container>
      <Header>{t('cryptocurrencies.header')}</Header>
      <SubHeader>{t('cryptocurrencies.subHeader')}</SubHeader>

      <Stats />

      <Divider />

      <SectionHeader>{t('cryptocurrencies.sectionHeader')}</SectionHeader>

      <FiltersSearch>
        <SearchInput
          onChange={handleSearch}
          placeholder={t('cryptocurrencies.searchPlaceholder') || ''}
        />
        <Filter onClick={() => setIsFiltersOpen(true)}>
          <IoMdOptions /> {t('cryptocurrencies.filters')}
        </Filter>
      </FiltersSearch>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>{t('cryptocurrencies.table.number')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.favorites')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.name')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.price')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.marketCap')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.priceChange')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.highestPrice')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.lowestPrice')}</TableHeader>
            <TableHeader>{t('cryptocurrencies.table.rank')}</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <QueryBoundary loading={searchLoading || paginateLoading} error={searchError || paginateError}>
            {cryptoData.map((crypto, index) => {
              const cryptoWithIndex = { ...crypto, index };
              return (
                <CryptoCurrencyTableRow
                  key={crypto?.cryptoId as string + index}
                  data={cryptoWithIndex}
                />
              );
            })}
          </QueryBoundary>
        </tbody>
      </Table>

      {!isSearching && (
        <PageButtonsContainer>
          <div>
            <PageInfo>{t('cryptocurrencies.pageInfo', { total: totalElements, page })}</PageInfo>
          </div>
          <div>
            <ButtonSecondary type="button" disabled={page === 0} onClick={handlePrevious}>
              {t('cryptocurrencies.previous')}
            </ButtonSecondary>
            <ButtonSecondary type="button" disabled={page === totalPages} onClick={handleNext}>
              {t('cryptocurrencies.next')}
            </ButtonSecondary>
          </div>
        </PageButtonsContainer>
      )}

      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={handleFilters}
      />
    </Container>
  );
};

export default Cryptocurrency;
