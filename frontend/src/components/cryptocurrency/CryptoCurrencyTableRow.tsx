import { FC } from "react";
import styled from "styled-components";

interface ChangeCellProps {
    positive: boolean;
}

interface CryptoCurrencyTableRow {
    index: number
    cryptoId?: string | null
    currentPrice?: number | null
    priceChange24h?: number | null
    high24h?: number | null
    low24h?: number | null
    marketCap?: number | null
    imageUrl?: string | null
    marketCapRank?: number | null
  }

interface CryptoCurrencyTableRowProps {
    data : CryptoCurrencyTableRow
}

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

const CryptoCurrencyTableRow : FC<CryptoCurrencyTableRowProps> = ({data}) => {
    return <TableRow>
        <TableCell>{data.index++}</TableCell>
        <WatchlistCell>☑</WatchlistCell>
        <TableCell>{data.cryptoId}</TableCell>
        <TableCell>{data.currentPrice}$</TableCell>
        <PriceCell>{data.marketCap}$</PriceCell>
        <ChangeCell positive>{data.priceChange24h}%</ChangeCell>
        <TableCell>{data.high24h}$</TableCell>
        <TableCell>{data.low24h}$</TableCell>
        <TableCell>{data.marketCapRank}</TableCell>
    </TableRow>
}

export default CryptoCurrencyTableRow;