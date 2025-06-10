import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface GraphOptions {
    graphType: string;
    dataType: string;
    cryptocurrency: string;
    timeRange: string;
    interval: string
}

interface ChartState {
    graphOptions: GraphOptions;
}

const getInitialGraphOptions = (): GraphOptions => {
    try {
        const stored = localStorage.getItem('chart');
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                graphType: parsed.graphType || 'bar',
                dataType: parsed.dataType || 'price',
                cryptocurrency: parsed.cryptocurrency || 'bitcoin',
                timeRange: parsed.timeRange || '1D',
                interval: parsed.interval || '1H'
            };
        }
    } catch (e) {
        console.warn('Error parsing chart options from localStorage:', e);
    }

    return {
        graphType: 'bar',
        dataType: 'price',
        cryptocurrency: 'bitcoin',
        timeRange: '1D',
        interval: '1H'
    };
};

const initialState: ChartState = {
    graphOptions: getInitialGraphOptions()
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setGraphOptions: (state, action: PayloadAction<GraphOptions>) => {
            localStorage.setItem('chart', JSON.stringify(action.payload))
            state.graphOptions = action.payload;
        },
    },
});

export const { setGraphOptions } = chartSlice.actions;
export default chartSlice.reducer;