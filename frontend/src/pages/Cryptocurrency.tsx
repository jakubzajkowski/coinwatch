import React from 'react';
import styled from 'styled-components';
import {IoMdOptions} from "react-icons/io";

interface ChangeCellProps {
    positive: boolean;
}

interface StatChangeProps {
    positive: boolean;
}

const Container = styled.div`
    width: 100%;
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

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  border: 1px solid rgb(255,255,255,0.4);
  border-radius: 8px;
  padding: 15px;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatTitle = styled.h3`
  font-size: 14px;
  color: ${({theme})=>theme.colors.third};
  margin: 0 0 10px 0;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: ${({theme})=>theme.colors.primary};
`;

const StatChange = styled.span<StatChangeProps>`
  color: ${props => props.positive ? '#16c784' : '#ea3943'};
  font-size: 14px;
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

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid rgb(255,255,255,0.4);
  color: ${({theme})=>theme.colors.primary};
`;

const WatchlistCell = styled(TableCell)`
  color: ${({theme})=>theme.colors.primary};
`;

const PriceCell = styled(TableCell)`
  font-weight: bold;
`;

const ChangeCell = styled(TableCell)<ChangeCellProps>`
  color: ${props => props.positive ? '#16c784' : '#ea3943'};
`;

const Cryptocurrency: React.FC = () => {
    return (
        <Container>
            <Header>Cryptocurrency Markets</Header>
            <SubHeader>Track prices, market cap, volume, and performance of thousands of cryptocurrencies</SubHeader>

            <StatsContainer>
                <StatCard>
                    <StatTitle>Market Cap</StatTitle>
                    <StatValue>$2.43T</StatValue>
                    <StatChange positive>↑ 1.9% 24h</StatChange>
                </StatCard>

                <StatCard>
                    <StatTitle>24h Volume</StatTitle>
                    <StatValue>$98.7B</StatValue>
                    <StatChange positive>↑ 13.6% 24h</StatChange>
                </StatCard>

                <StatCard>
                    <StatTitle>BTC Dominance</StatTitle>
                    <StatValue>48.2%</StatValue>
                    <StatChange positive>↑ 1.6% 24h</StatChange>
                </StatCard>

                <StatCard>
                    <StatTitle>ETH Dominance</StatTitle>
                    <StatValue>18.7%</StatValue>
                    <StatChange positive={false}>↓ -0.5% 24h</StatChange>
                </StatCard>

                <StatCard>
                    <StatTitle>Cryptocurrencies</StatTitle>
                    <StatValue>10,482</StatValue>
                    <StatChange positive>↑ 13.8% new today</StatChange>
                </StatCard>
            </StatsContainer>

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
                    <TableHeader>Layer</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>1h %</TableHeader>
                    <TableHeader>24h %</TableHeader>
                    <TableHeader>7d %</TableHeader>
                    <TableHeader>M</TableHeader>
                </TableRow>
                </thead>
                <tbody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <WatchlistCell>☑</WatchlistCell>
                    <TableCell>Bitcoin BTC</TableCell>
                    <TableCell>Layer 1</TableCell>
                    <PriceCell>$51,342.67</PriceCell>
                    <ChangeCell positive>~ 0.12%</ChangeCell>
                    <ChangeCell positive>~ 2.34%</ChangeCell>
                    <ChangeCell positive>~ 5.67%</ChangeCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>1</TableCell>
                    <WatchlistCell>☑</WatchlistCell>
                    <TableCell>Bitcoin BTC</TableCell>
                    <TableCell>Layer 1</TableCell>
                    <PriceCell>$51,342.67</PriceCell>
                    <ChangeCell positive>~ 0.12%</ChangeCell>
                    <ChangeCell positive>~ 2.34%</ChangeCell>
                    <ChangeCell positive>~ 5.67%</ChangeCell>
                    <TableCell></TableCell>
                </TableRow>
                </tbody>
            </Table>
        </Container>
    );
};

export default Cryptocurrency;