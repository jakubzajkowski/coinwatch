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

interface CandleGraphProps {
    data: CandleData[];
}

interface CandleData {
    bucket: string;
    open: number;
    close: number;
    high: number;
    low: number;
}

const mockData = (data: CandleData[]) => {
    return {series: [{
        data: [
          ...data.map((item) => ({
            x: new Date(item.bucket),
            y: [item.open, item.high, item.low, item.close]
          }))
        ]
    }],
    options: {
        chart: {
            type: 'candlestick' as const,
            height: 350,
            toolbar: {
                show: false
            },
            background: theme.colors.fourth,
        },
        theme: {
            mode: 'dark' as const,
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#26A69A',
                    downward: '#EF5350'
                },
                wick: {
                    useFillColor: true,
                }
            }
        },
        grid: {
            borderColor: '#2d2d2d'
        },
        xaxis: {
            type: 'datetime' as const
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }};
};

const CandleGraph: React.FC<CandleGraphProps> = ({ data }) => {
    const [chartData] = useState(mockData(data));

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
