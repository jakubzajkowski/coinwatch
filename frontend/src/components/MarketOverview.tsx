import styled from "styled-components";
import { FaSort } from "react-icons/fa";
import {useQuery} from "@apollo/client";
import {GetCryptoCurrenciesQuery} from "../graphql/generated.ts";
import {GET_CURRENCIES_FOR_MARKETOVERVIEW} from "../apollo/queries.ts";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import {LinkCoinWatch} from "./styled.tsx";
import QueryBoundary from "./QueryBoundary.tsx";

const MarketOverviewTable = styled.div`
    width: 100%;
    padding: 3rem;
    margin: 1rem;
`

const MarketOverviewHeader = styled.div`
    color: #fff;
    font-weight: bold;
    text-align: left;
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const MarketOverviewRow = styled.div`
    display: grid;
    grid-template-columns: minmax(50px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    gap: 10px;
    padding: 1rem 0;
    border-bottom: 1px solid #444;
`;

const MarketOverviewCell = styled.div`
    padding: 0;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const CryptoImage = styled.img`
    width: 40px;
    height: 40px;
    margin: 0 0.5rem 0 0;
`


const MarketOverview = () => {
    const { loading, error, data } = useQuery<GetCryptoCurrenciesQuery>(GET_CURRENCIES_FOR_MARKETOVERVIEW, {
        variables: { limit: 10, orderBy: "id" },
    });
    
    return (
        <QueryBoundary loading={loading} error={error}>
            <MarketOverviewTable>
                <MarketOverviewRow>
                    <MarketOverviewHeader>#</MarketOverviewHeader>
                    <MarketOverviewHeader>Name</MarketOverviewHeader>
                    <MarketOverviewHeader>Price <FaSort /></MarketOverviewHeader>
                    <MarketOverviewHeader>24h % <FaSort /></MarketOverviewHeader>
                    <MarketOverviewHeader>Market Cap <FaSort /></MarketOverviewHeader>
                    <MarketOverviewHeader>Volume (24h) <FaSort /></MarketOverviewHeader>
                </MarketOverviewRow>
                {data && data.getCryptoCurrencies && data?.getCryptoCurrencies.map((crypto, index) => (
                    <LinkCoinWatch to={`/crypto/${crypto?.cryptoId}`} >
                        <MarketOverviewRow key={crypto?.id}>
                            <MarketOverviewCell>{index + 1}</MarketOverviewCell>
                            <MarketOverviewCell><CryptoImage src={crypto?.imageUrl as string}/>{crypto?.name}</MarketOverviewCell>
                            <MarketOverviewCell>${crypto?.currentPrice}</MarketOverviewCell>
                            <MarketOverviewCell>
                                {(crypto?.priceChangePercentage24h as number)>0 ?
                                    <div>
                                        <FaCaretUp color='green' />
                                        {Math.abs(crypto?.priceChangePercentage24h as number)}%
                                    </div>:
                                    <div>
                                        <FaCaretDown color='red' />
                                        {Math.abs(crypto?.priceChangePercentage24h as number)}%
                                    </div>
                                }
                            </MarketOverviewCell>
                            <MarketOverviewCell>${crypto?.marketCap}</MarketOverviewCell>
                            <MarketOverviewCell>${crypto?.totalVolume}</MarketOverviewCell>
                        </MarketOverviewRow>
                    </LinkCoinWatch>
                ))}
            </MarketOverviewTable>
        </QueryBoundary>
    );
};

export default MarketOverview;