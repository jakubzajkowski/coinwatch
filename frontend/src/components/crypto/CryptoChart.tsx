import {FC, useState} from "react";
import {useQuery} from "@apollo/client";
import {GetCryptoPriceHistoryByRangeQuery} from "../../graphql/generated.ts";
import {GET_CRYPTO_PRICE_HISTORY_BY_RANGE_FOR_CRYPTO} from "../../apollo/queries.ts";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styled from "styled-components";
import QueryBoundary from "../QueryBoundary.tsx";

const rangeOptions = [
    { label: "5 years", value: "5y" },
    { label: "3 years", value: "3y" },
    { label: "1 year", value: "1y" },
    { label: "6 months", value: "6m" },
    { label: "1 month", value: "1m" },
    { label: "15 days", value: "15d" },
    { label: "1 day", value: "1d" },
    { label: "1 hour", value: "1h" },
  ];

interface CryptoChartProps {
    cryptoId: string
}

interface CustomTooltipProps {
    payload?: {value: string}[]
    label?: string
}

const CustomToolTipContainer = styled.div`
    background-color: ${(props) => props.theme.colors.fourth};
    padding: 1rem;
    font-size: 0.9rem !important;
    border-radius: 0.5rem;
`

const RangeContainer = styled.div`
    padding: 2rem 0;
    font-size: 0.9rem !important;
    display: flex;
    gap: 1rem;
`

interface RangeOptionProps {
    isActive: boolean
}

const RangeOption = styled.div<RangeOptionProps>`
    padding: 1rem;
    cursor: pointer;
    border-radius: 0.5rem;
    background-color: ${(props) => props.isActive ? 'black' : props.theme.colors.fourth};
`

const CustomTooltip : FC<CustomTooltipProps> = ({ payload, label }) => {
    if (payload && payload.length) {
        return (
            <CustomToolTipContainer>
                <p>Price: ${payload[0].value}</p>
                <p>Date: {label}</p>
            </CustomToolTipContainer>
        );
    }

    return null;
};

const CryptoChart : FC<CryptoChartProps> = ({cryptoId}) =>{
    const [activeRange,setActiveRange] = useState<string>();

    const {error,loading,data,refetch} = useQuery<GetCryptoPriceHistoryByRangeQuery>(GET_CRYPTO_PRICE_HISTORY_BY_RANGE_FOR_CRYPTO,{
        variables:{cryptoId:cryptoId,range: "1 day"}
    })

    const handleRange = (label: string) => {
        setActiveRange(label);
        refetch({cryptoId:cryptoId,range: label})
    }

    const reducedData = data?.getCryptoPriceHistoryByRange
        ?.filter((_, index) => index % 10 === 0)
        ?.map(entry => {
            const date = entry?.recordedAt ? new Date(entry.recordedAt) : null;

            return {
                recordedAt: date
                    ? date.toLocaleString("pl-PL", {
                        year: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    : "No Data",
                price: entry?.price,
            };
        }) || [];

    return <QueryBoundary loading={loading} error={error}>
        <RangeContainer>
        {rangeOptions.map((option) => 
            <RangeOption onClick={()=>handleRange(option.label)} isActive={option.label==activeRange}>{option.value}</RangeOption>
        )}
        </RangeContainer>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reducedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="recordedAt"
                    tickFormatter={(time) => time}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" dot={false} stroke="#8884d8" strokeWidth={3}  />
            </LineChart>
        </ResponsiveContainer>
    </QueryBoundary>
};


export default CryptoChart;