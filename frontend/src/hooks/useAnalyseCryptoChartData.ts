import { useQuery } from "@apollo/client";
import { useState } from "react";
import analyseChartRange from "../utils/analyseChartRange";
import { GET_CRYPTO_CHART_DATA } from "../apollo/queries";
import { GraphOptions } from "../redux/chartSlice";

const getChartType = (graphType: string) => {
    switch (graphType) {
        case 'candle':
            return 'CANDLE';
        case 'bar':
            return 'BAR';
        case 'line':
            return 'LINE';
    }   
}

const useAnalyseCryptoChartData = (graphOptions: GraphOptions) => {
    const [now, setNow] = useState(new Date());

    const { from, to } = analyseChartRange(graphOptions.timeRange, now);


    const { data, loading, error } = useQuery(GET_CRYPTO_CHART_DATA, {
        variables: {
            cryptoId: graphOptions.cryptocurrency,
            interval: graphOptions.interval,
            from: from,
            to: to,
            chartType: getChartType(graphOptions.graphType)
        }
    });

    return { data, loading, error };
}

export default useAnalyseCryptoChartData;