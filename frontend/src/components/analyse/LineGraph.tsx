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
    // Add any props if needed
}

const mockData = {
    series: [{
        name: "Value",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        theme: {
            mode: 'dark' as const
        }
    }
};

const LineGraph: React.FC<LineGraphProps> = () => {
    const [chartData] = useState(mockData);

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
