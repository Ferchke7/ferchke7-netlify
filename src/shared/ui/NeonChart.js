import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function NeonChart({ className = "", option }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const isTestDom = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("jsdom");

        if (!chartRef.current || isTestDom) {
            return undefined;
        }

        const chart = echarts.init(chartRef.current, null, { renderer: "svg" });
        chart.setOption(option);

        const resizeChart = () => chart.resize();
        window.addEventListener("resize", resizeChart);

        return () => {
            window.removeEventListener("resize", resizeChart);
            chart.dispose();
        };
    }, [option]);

    return <div className={`neon-chart ${className}`} ref={chartRef} role="img" aria-label="Portfolio metric chart" />;
}
