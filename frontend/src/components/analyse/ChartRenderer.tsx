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

    if(graphOptions.graphType === 'candle') {
        const candleData = useMemo(() => {
            return data?.getCryptoChartData;
        }, [data]);

        return <CandleGraph data={candleData as any} />
    }
    if(graphOptions.graphType === 'line') {

        const series = useMemo(() => {
            return data?.getCryptoChartData?.map((item: any) => item.average.toFixed(2));
        }, [data]);
        const xaxis = useMemo(() => {
            return data?.getCryptoChartData?.map((item: any) => item.bucket);
        }, [data]);

    return <LineGraph series={series as any} xaxis={xaxis as any} />
    }
    if(graphOptions.graphType === 'bar') {
        const series = useMemo(() => {
            return data?.getCryptoChartData?.map((item: any) => item.average.toFixed(2));
        }, [data]);
        const xaxis = useMemo(() => {
            return data?.getCryptoChartData?.map((item: any) => item.bucket);
        }, [data]);

        return <BarGraph series={series as any} xaxis={xaxis as any} />
    }

    return null;
}

export default ChartRenderer;