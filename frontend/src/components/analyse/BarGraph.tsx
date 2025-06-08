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

interface BarGraphProps {
    series: number[];
    xaxis: string[];
}

const mockData = (series: number[], xaxis: string[]) => {
    return {series: [{
        name: 'Value',
        data: series
    }],
    options: {
        chart: {
            type: 'bar' as const,
            height: 350,
            background: theme.colors.fourth,  
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: xaxis,
        },
        yaxis: {
            title: {
                text: 'Value'
            }
        },
        fill: {
            opacity: 1
        },
        theme: {
            mode: 'dark' as const
        }
    }};
};

const BarGraph: React.FC<BarGraphProps> = ({ series, xaxis }) => {
    const [chartData] = useState(mockData(series, xaxis));

    return (
        <GraphContainer>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </GraphContainer>
    );
};

export default BarGraph;
