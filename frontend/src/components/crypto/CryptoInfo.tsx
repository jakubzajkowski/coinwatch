import {FC} from "react";
import styled from "styled-components";

interface CryptoInfoProps {
    marketCap: number | null | undefined
    volume24h: number | null | undefined
    supply:number | null | undefined
    allTimeHigh: number | null | undefined
}

const Container = styled.div`
    margin: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const InfoCard = styled.div`
    border-radius: 0.5rem;
    border: 1px solid rgb(255,255,255,0.4);
    padding: 2rem;
    width: 24%;
`
const DataInfo = styled.h2`
    font-size: 2rem;
    margin: 0.5rem 0;
`
const DataLabel = styled.p`
    font-weight: bold;
`



const CryptoInfo : FC<CryptoInfoProps> = ({marketCap,volume24h,supply,allTimeHigh}) => {
    return <Container>
        <InfoCard>
            <DataLabel>
                Market Cap
            </DataLabel>
            <DataInfo>
                ${marketCap}
            </DataInfo>
        </InfoCard>
        <InfoCard>
            <DataLabel>
                Volume (24)
            </DataLabel>
            <DataInfo>
                ${volume24h}
            </DataInfo>
        </InfoCard>
        <InfoCard>
            <DataLabel>
                Circulating Supply
            </DataLabel>
            <DataInfo>
                {supply} BTC
            </DataInfo>
        </InfoCard>
        <InfoCard>
            <DataLabel>
                 All-Time High
            </DataLabel>
            <DataInfo>
                ${allTimeHigh}
            </DataInfo>
        </InfoCard>
    </Container>
}

export default CryptoInfo;