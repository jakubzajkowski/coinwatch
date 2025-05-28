import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const GraphContainer = styled.div`
    width: 100%;
    height: 400px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface CandleGraphProps {
    // Add any props if needed
}

const mockData = {
    series: [{
        data: [
            {
                x: new Date(2023, 0, 1),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
                x: new Date(2023, 0, 2),
                y: [6632.01, 6643.59, 6620.75, 6626.02]
            },
            {
                x: new Date(2023, 0, 3),
                y: [6627.02, 6659.41, 6620.75, 6652.55]
            },
            {
                x: new Date(2023, 0, 4),
                y: [6652.55, 6692.61, 6652.07, 6681.69]
            },
            {
                x: new Date(2023, 0, 5),
                y: [6681.69, 6695.45, 6662.22, 6664.54]
            }
        ]
    }],
    options: {
        chart: {
            type: 'candlestick' as const,
            height: 350,
            toolbar: {
                show: true
            }
        },
        title: {
            text: 'Candlestick Chart',
            align: 'left' as const
        },
        xaxis: {
            type: 'datetime' as const
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        theme: {
            mode: 'dark' as const
        }
    }
};

const CandleGraph: React.FC<CandleGraphProps> = () => {
    const [chartData] = useState(mockData);

    return (
        <GraphContainer>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="candlestick"
                height={350}
            />
        </GraphContainer>
    );
};

export default CandleGraph;
