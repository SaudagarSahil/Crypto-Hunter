import React, { useEffect, useRef } from "react";
import {
  createChart,
  UTCTimestamp,
  CandlestickData,
  CandlestickSeries,
} from "lightweight-charts";

const CoinCandleChart: React.FC<{
  data?:
    | { time: number; open: number; high: number; low: number; close: number }[]
    | undefined;
}> = ({ data = [] }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      //   width: chartContainerRef.current.clientWidth,
      width: 880,
      height: 550,
      //   layout: { background: "#FFFFFF", textColor: "#000" },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
    });

    const candleStickSeries = chart.addSeries(CandlestickSeries);

    const formattedData: CandlestickData[] = data?.map((entry) => ({
      time: (entry.time / 1000) as UTCTimestamp,
      open: entry.open,
      high: entry.high,
      low: entry.low,
      close: entry.close,
    }));

    candleStickSeries.setData(formattedData);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CoinCandleChart;
