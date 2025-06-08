import React from 'react';
import styled from 'styled-components';
import GraphOptions from './GraphOptions';
import QueryBoundary from '../QueryBoundary';
import useAnalyseCryptoChartData from '../../hooks/useAnalyseCryptoChartData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setGraphOptions } from '../../redux/chartSlice';
import ChartRenderer from './ChartRenderer';

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
    const graphOptions = useSelector((state: RootState) => state.chart.graphOptions);
    const dispatch = useDispatch();
    const { data, loading, error } = useAnalyseCryptoChartData(graphOptions);

    const handleOptionsChange = (options: {
        graphType: string;
        dataType: string;
        cryptocurrency: string;
        timeRange: string;
    }) => {
        dispatch(setGraphOptions(options)); 
    };

    return (
        <GraphContainer>
            <GraphOptions onOptionsChange={handleOptionsChange} />
            <QueryBoundary loading={loading} error={error}>
                {data && <ChartRenderer data={data} />}
            </QueryBoundary>
        </GraphContainer>
    );
};

export default AnalyseGraph;


