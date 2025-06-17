export interface AnalyseChartRange {
    from: string;
    to: string;
}

const analyseChartRange = (timeRange: string, now: Date): AnalyseChartRange => {
    const earlier = new Date(now);

    switch (timeRange) {
        case '1H':
            earlier.setHours(earlier.getHours() - 1);
            break;
        case '4H':
            earlier.setHours(earlier.getHours() - 4);
            break;
        case '12H':
            earlier.setHours(earlier.getHours() - 12);
            break;
        case '1D':
            earlier.setDate(earlier.getDate() - 1);
            break;
        case '1W':
            earlier.setDate(earlier.getDate() - 7);
            break;
        case '1M':
            earlier.setMonth(earlier.getMonth() - 1);
            break;
        case '3M':
            earlier.setMonth(earlier.getMonth() - 3);
            break;
        case '1Y':
            earlier.setFullYear(earlier.getFullYear() - 1);
            break;
        case 'ALL':
            earlier.setFullYear(earlier.getFullYear() - 10);  // przykładowo 10 lat wstecz
            break;
        default:
            earlier.setMonth(earlier.getMonth() - 1);
    }

    return {
        from: earlier.toISOString(),
        to: now.toISOString()
    };
}

export default analyseChartRange;
