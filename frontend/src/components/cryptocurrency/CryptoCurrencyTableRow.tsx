import { FC } from "react";
import styled from "styled-components";

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

const CryptoCurrencyTableRow : FC<CryptoCurrencyTableRowProps> = ({data}) => {
    return <TableRow>
        <TableCell>{data.index++}</TableCell>
        <WatchlistCell>☑</WatchlistCell>
        <TableCell>{data.cryptoId}</TableCell>
        <PriceCell>{data.currentPrice}$</PriceCell>
        <TableCell>{data.marketCap}$</TableCell>
        <TableCell>{data.priceChange24h}$</TableCell>
        <TableCell>{data.high24h}$</TableCell>
        <TableCell>{data.low24h}$</TableCell>
        <TableCell>{data.marketCapRank}</TableCell>
    </TableRow>
}

export default CryptoCurrencyTableRow;