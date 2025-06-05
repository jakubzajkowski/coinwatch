import React, { useState } from 'react';
import styled from 'styled-components';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import CandleGraph from './CandleGraph';
import GraphOptions from './GraphOptions';
import { GET_CRYPTO_CHART_DATA } from '../../apollo/queries';
import { useQuery } from '@apollo/client';
import QueryBoundary from '../QueryBoundary';

export interface GraphOptions {
    graphType: string;
    dataType: string;
    cryptocurrency: string;
    timeRange: string;
}

const GraphContainer = styled.div`
    width: 75%;
    height: 400px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.fourth};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface AnalyseGraphProps {
}

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

const AnalyseGraph: React.FC<AnalyseGraphProps> = () => {
    const [graphOptions, setGraphOptions] = useState<GraphOptions>({
        graphType: 'bar',
        dataType: 'price',
        cryptocurrency: 'bitcoin',
        timeRange: '1D'
    });

    const { data, loading, error } = useQuery(GET_CRYPTO_CHART_DATA, {
        variables: {
            cryptoId: graphOptions.cryptocurrency,
            interval: '1h',
            from: '2025-05-03T15:30:00.000+02:00',
            to: '2025-06-04T15:30:00.000+02:00',
            chartType: getChartType(graphOptions.graphType)
        }
    });

    const handleOptionsChange = (options: {
        graphType: string;
        dataType: string;
        cryptocurrency: string;
        timeRange: string;
    }) => {
        setGraphOptions(options);
    };

    return (
        <GraphContainer>
            <GraphOptions onOptionsChange={handleOptionsChange} options={graphOptions} />
            <QueryBoundary loading={loading} error={error}>
                {data && (
                    <>
                        {graphOptions.graphType === 'candle' && <CandleGraph />}
                        {graphOptions.graphType === 'line' && <LineGraph series={data.getCryptoChartData.map((item: any) => item.average.toFixed(2))} xaxis={data.getCryptoChartData.map((item: any) => item.bucket)} />}
                        {graphOptions.graphType === 'bar' && <BarGraph series={data.getCryptoChartData.map((item: any) => item.average.toFixed(2))} xaxis={data.getCryptoChartData.map((item: any) => item.bucket)} />}
                    </>
                )}
            </QueryBoundary>
        </GraphContainer>
    );
};

export default AnalyseGraph;


