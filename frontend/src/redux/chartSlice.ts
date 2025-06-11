import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface GraphOptionsType {
    graphType: string;
    dataType: string;
    cryptocurrency: string;
    timeRange: string;
    interval: string;
    compare: boolean
    compareWith: string
}

interface ChartState {
    graphOptions: GraphOptionsType;
}

const getInitialGraphOptions = (): GraphOptionsType => {
    try {
        const stored = localStorage.getItem('chart');
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                graphType: parsed.graphType || 'line',
                dataType: parsed.dataType || 'price',
                cryptocurrency: parsed.cryptocurrency || 'bitcoin',
                timeRange: parsed.timeRange || '1D',
                interval: parsed.interval || '1H',
                compare: false,
                compareWith: 'bitcoin'
            };
        }
    } catch (e) {
        console.warn('Error parsing chart options from localStorage:', e);
    }

    return {
        graphType: 'line',
        dataType: 'price',
        cryptocurrency: 'bitcoin',
        timeRange: '1D',
        interval: '1H',
        compare: true,
        compareWith: 'bitcoin'
    };
};

const initialState: ChartState = {
    graphOptions: getInitialGraphOptions()
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setGraphOptions: (state, action: PayloadAction<GraphOptionsType>) => {
            localStorage.setItem('chart', JSON.stringify(action.payload))
            state.graphOptions = action.payload;
        },
    },
});

export const { setGraphOptions } = chartSlice.actions;
export default chartSlice.reducer;