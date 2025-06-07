import React, { useState } from 'react';
import styled from 'styled-components';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import CandleGraph from './CandleGraph';
import GraphOptions from './GraphOptions';
import QueryBoundary from '../QueryBoundary';
import useAnalyseCryptoChartData from '../../hooks/useAnalyseCryptoChartData';

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


const AnalyseGraph: React.FC<AnalyseGraphProps> = () => {
    const [graphOptions, setGraphOptions] = useState<GraphOptions>({
        graphType: 'bar',
        dataType: 'price',
        cryptocurrency: 'bitcoin',
        timeRange: '1D'
    });

    const { data, loading, error } = useAnalyseCryptoChartData(graphOptions);

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
                        {graphOptions.graphType === 'candle' && <CandleGraph data={data.getCryptoChartData} />}
                        {graphOptions.graphType === 'line' && <LineGraph series={data.getCryptoChartData.map((item: any) => item.average.toFixed(2))} xaxis={data.getCryptoChartData.map((item: any) => item.bucket)} />}
                        {graphOptions.graphType === 'bar' && <BarGraph series={data.getCryptoChartData.map((item: any) => item.average.toFixed(2))} xaxis={data.getCryptoChartData.map((item: any) => item.bucket)} />}
                    </>
                )}
            </QueryBoundary>
        </GraphContainer>
    );
};

export default AnalyseGraph;


