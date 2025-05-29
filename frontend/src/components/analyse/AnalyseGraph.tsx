import React from 'react';
import styled from 'styled-components';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import CandleGraph from './CandleGraph';
import GraphOptions from './GraphOptions';

const GraphContainer = styled.div`
    width: 75%;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface AnalyseGraphProps {
}

const AnalyseGraph: React.FC<AnalyseGraphProps> = () => {
    const handleOptionsChange = (options: {
        graphType: string;
        dataType: string;
        cryptocurrency: string;
        timeRange: string;
    }) => {
        console.log('Options changed:', options);
    };

    return (
        <GraphContainer>
            <GraphOptions onOptionsChange={handleOptionsChange} />
                <CandleGraph />
        </GraphContainer>
    );
};

export default AnalyseGraph;


