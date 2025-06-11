import { useQuery } from "@apollo/client";
import { useState } from "react";
import analyseChartRange from "../utils/analyseChartRange";
import { GET_CRYPTO_CHART_DATA } from "../apollo/queries";
import { GraphOptionsType } from "../redux/chartSlice";

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

const useAnalyseCryptoChartData = (graphOptions: GraphOptionsType) => {
    const [now] = useState(new Date());
    const { from, to } = analyseChartRange(graphOptions.timeRange, now);

    const { data: mainData, loading: mainLoading, error: mainError } = useQuery(GET_CRYPTO_CHART_DATA, {
        variables: {
            cryptoId: graphOptions.cryptocurrency,
            interval: graphOptions.interval,
            from,
            to,
            chartType: getChartType(graphOptions.graphType)
        }
    });
    const { data: compareData, loading: compareLoading, error: compareError } = useQuery(
        GET_CRYPTO_CHART_DATA,
        {
            skip: !graphOptions.compare,
            variables: {
                cryptoId: graphOptions.compareWith,
                interval: graphOptions.interval,
                from,
                to,
                chartType: getChartType(graphOptions.graphType)
            }
        }
    );

    return {
        data: {
            main: mainData,
            compare: graphOptions.compare ? compareData : null
        },
        loading: mainLoading || compareLoading,
        error: mainError || compareError
    };
};

export default useAnalyseCryptoChartData;