import CandleGraph from "./CandleGraph"
import LineGraph from "./LineGraph"
import BarGraph from "./BarGraph"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useMemo } from "react"
import { GetCryptoChartDataQuery } from "../../graphql/generated"

interface ChartRendererProps {
    data: {main: GetCryptoChartDataQuery,compare: GetCryptoChartDataQuery} | undefined;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ data }) => {
    const graphOptions = useSelector((state: RootState) => state.chart.graphOptions);

    if(graphOptions.graphType === 'candle') {
        const main = useMemo(() => {
            return data?.main?.getCryptoChartData;
        }, [data]);

        return <CandleGraph data={main as any} />
    }
    if(graphOptions.graphType === 'line') {
        const series = useMemo(() => {
            const main = data?.main?.getCryptoChartData?.map((item: any) => parseFloat(item.average.toFixed(2))) || [];
            const compare = data?.compare?.getCryptoChartData?.map((item: any) => parseFloat(item.average.toFixed(2))) || [];
    
            const result = [
                { name: graphOptions.cryptocurrency, data: main }
            ];
    
            if (graphOptions.compare) {
                result.push({ name: graphOptions.compareWith, data: compare });
            }
    
            return result;
        }, [data]);
    
        const xaxis = useMemo(() => {
            return data?.main?.getCryptoChartData?.map((item: any) => item.bucket) || [];
        }, [data]);
    
        return <LineGraph series={series} xaxis={xaxis} />;
    }
    if(graphOptions.graphType === 'bar') {
        const series = useMemo(() => {
            return data?.main.getCryptoChartData?.map((item: any) => item.average.toFixed(2));
        }, [data]);
        const xaxis = useMemo(() => {
            return data?.main?.getCryptoChartData?.map((item: any) => item.bucket);
        }, [data]);

        return <BarGraph series={series as any} xaxis={xaxis as any} />
    }

    return null;
}

export default ChartRenderer;