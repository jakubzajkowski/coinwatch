import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const GraphContainer = styled.div`
    width: 100%;
    height: 400px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface BarGraphProps {
    // Add any props if needed
}

const mockData = {
    series: [{
        name: 'Value',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }],
    options: {
        chart: {
            type: 'bar' as const,
            height: 350,
            toolbar: {
                show: true
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
    }
};

const BarGraph: React.FC<BarGraphProps> = () => {
    const [chartData] = useState(mockData);

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
