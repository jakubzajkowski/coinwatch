import React from 'react';
import styled, { useTheme } from 'styled-components';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const GraphContainer = styled.div`
    width: 100%;
    height: 400px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


interface DataPoint {
    name: string;
    value: number;
}

interface AnalyseGraphProps {
}
const mockData: DataPoint[] = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4000 },
    { name: 'Sep', value: 3200 },
    { name: 'Oct', value: 2800 },
    { name: 'Nov', value: 3300 },
    { name: 'Dec', value: 3500 }
];

const AnalyseGraph: React.FC<AnalyseGraphProps> = () => {
    const theme = useTheme();
    return (
        <GraphContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={mockData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        stroke={theme.colors.primary}
                    />
                    <YAxis
                        stroke={theme.colors.primary}
                    />
                    <Tooltip
                        contentStyle={{
                            border: 'none',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </GraphContainer>
    );
};

export default AnalyseGraph;


