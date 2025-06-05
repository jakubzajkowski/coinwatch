import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const GraphContainer = styled.div`
    width: 100%;
    height: 400px;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.fourth};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface LineGraphProps {
    series: number[];
    xaxis: string[];
}

const mockData = (series: number[], xaxis: string[]) => {
    return {series: [{
        name: "Value",
        data: series
    }],
    options: {
        chart: {
            height: 350,
            type: 'line' as const,
            background: theme.colors.fourth,
            zoom: {
                enabled: true
            },
            toolbar: {
                show: false     
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight' as const,
            width: 2
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: xaxis,
        },
        theme: {
            mode: 'dark' as const
        }
    }}; 
};

const LineGraph: React.FC<LineGraphProps> = ({ series, xaxis }) => {
    const [chartData] = useState(mockData(series, xaxis));

    return (
        <GraphContainer>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </GraphContainer>
    );
};

export default LineGraph;
