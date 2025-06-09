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

const initialState: ChartState = {
    graphOptions: {
        graphType: 'bar',
        dataType: 'price',
        cryptocurrency: 'bitcoin',
        timeRange: '1D',
        interval: '1h'
    }
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setGraphOptions: (state, action: PayloadAction<GraphOptions>) => {
            state.graphOptions = action.payload;
        },
    },
});

export const { setGraphOptions } = chartSlice.actions;
export default chartSlice.reducer;