import React, { useState } from 'react';
import styled from 'styled-components';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import CandleGraph from './CandleGraph';
import GraphOptions from './GraphOptions';

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
        graphType: 'candle',
        dataType: 'price',
        cryptocurrency: 'BTC',
        timeRange: '1D'
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
            <GraphOptions onOptionsChange={handleOptionsChange} />
            {graphOptions.graphType === 'candle' && <CandleGraph />}
            {graphOptions.graphType === 'line' && <LineGraph />}
            {graphOptions.graphType === 'bar' && <BarGraph />}
        </GraphContainer>
    );
};

export default AnalyseGraph;


