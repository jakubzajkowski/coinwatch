import {FC} from "react";
import {useQuery} from "@apollo/client";
import {GetCryptoPriceHistoryQuery} from "../../graphql/generated.ts";
import {GET_CRYPTO_PRICE_HISTORY_FOR_CRYPTO} from "../../apollo/queries.ts";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styled from "styled-components";

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
    const {error,loading,data} = useQuery<GetCryptoPriceHistoryQuery>(GET_CRYPTO_PRICE_HISTORY_FOR_CRYPTO,{
        variables:{cryptoId:cryptoId}
    })

    if (error) return <div>Error</div>

    if (loading) return <div>Loading</div>

    const reducedData = data?.getCryptoPriceHistory
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

    return <ResponsiveContainer width="100%" height={300}>
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
};


export default CryptoChart;