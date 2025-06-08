import CandleGraph from "./CandleGraph"
import LineGraph from "./LineGraph"
import BarGraph from "./BarGraph"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useMemo } from "react"
import { GetCryptoChartDataQuery } from "../../graphql/generated"

interface ChartRendererProps {
    data: GetCryptoChartDataQuery | undefined;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ data }) => {
    const graphOptions = useSelector((state: RootState) => state.chart.graphOptions);

    const series = useMemo(() => {
        return data?.getCryptoChartData?.map((item: any) => item.average.toFixed(2));
    }, [data]);
    const xaxis = useMemo(() => {
        return data?.getCryptoChartData?.map((item: any) => item.bucket);
    }, [data]);
    const candleData = useMemo(() => {
        return data?.getCryptoChartData?.map((item: any) => ({
            ...item,
            bucket: item.bucket,
            open: item.open,
            close: item.close,
            high: item.high,
            low: item.low
        })) as any;
    }, [data]);

    console.log(candleData);

    return (
        data && (
            <div>
                {graphOptions.graphType === 'candle' && <CandleGraph data={candleData as any} />}
                {graphOptions.graphType === 'line' && <LineGraph series={series as any} xaxis={xaxis as any} />}
                {graphOptions.graphType === 'bar' && <BarGraph series={series as any} xaxis={xaxis as any} />}    
            </div>
        )
    )
}

export default ChartRenderer;