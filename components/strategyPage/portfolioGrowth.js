import { useTheme } from "next-themes";
import React, { useEffect, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const PortfolioGrowth = ({ strategy, trades, plotByTrade = false }) => {
  // Process trades to create equity curve data
  const data = useMemo(() => {
    if (!trades || trades.length === 0) {
      console.log("No trades data available");
      return [];
    }

    let equity = strategy.metrics.initialCapital;
    const equityCurve = [];

    trades.forEach((trade) => {
      equity += trade.netProfit;
      equityCurve.push({
        date: trade.exitDate.toDate().getTime(),
        equity: equity,
        tradeNumber: trade.order + 1,
      });
    });

    return equityCurve;
  }, [trades, strategy.metrics.initialCapital]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const xValue = plotByTrade
        ? `Trade ${label}`
        : new Date(label).toLocaleDateString();
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          <p className="text-gray-700 dark:text-white font-medium">{xValue}</p>
          <div className="flex flex-row items-center">
            <div className="w-2 h-2 bg-blue-600 dark:bg-green-400 rounded-full mr-2" />
            <p className="text-blue-600 dark:text-green-400 font-semibold">
              {`${strategy.name}: $${payload[0].value.toLocaleString()}`}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const { theme } = useTheme();

  // Date formatter to show Month and Year
  const dateFormatter = (date) => {
    const options = { year: "numeric", month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const xAxisProps = plotByTrade
    ? {
        dataKey: "tradeNumber",
        type: "number",
        domain: [1, data.length],
        tickFormatter: (value) => `Trade ${value}`,
      }
    : {
        dataKey: "date",
        type: "number",
        scale: "time",
        domain: [
          Math.min(...data.map((d) => d.date)),
          Math.max(...data.map((d) => d.date)),
        ],
        tickFormatter: dateFormatter,
        interval: Math.floor(data.length / 12),
      };

  // Function to generate reference lines every 5 years, starting from Jan 1st
  // Memoized reference lines to avoid full re-render
  const referenceLines = useMemo(() => {
    if (plotByTrade) return []; // Don't show reference lines in trade mode

    const startDate = new Date(Math.min(...data.map((d) => d.date)));
    const endDate = new Date(Math.max(...data.map((d) => d.date)));
    const lines = [];

    let currentDate = new Date(startDate.getFullYear(), 0, 1); // January 1st of the start year
    const yearsSince1970 = currentDate.getFullYear() - 1970;
    const yearsToAdd = 5 - (yearsSince1970 % 5);
    currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);

    while (currentDate <= endDate) {
      if (currentDate >= startDate) {
        lines.push(
          <ReferenceLine
            key={currentDate.getTime()}
            x={currentDate.getTime()}
            stroke="#888"
            strokeDasharray="3 3"
            label={{
              value: currentDate.getFullYear(),
              position: "top",
              fill: "#888",
            }}
          />
        );
      }
      currentDate.setFullYear(currentDate.getFullYear() + 5);
    }

    return lines;
  }, [plotByTrade, data]);

  return (
    <div className="rounded-xl shadow-2xl dark:border w-full bg-white dark:bg-black py-6 px-10">
      <h1 className="text-xl text-blue-900 dark:text-white saturate-200 font-medium mb-6">
        Portfolio Growth
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ left: 20, right: 20 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme === "dark" ? "#22c55e" : "#097EF2"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme === "dark" ? "#22c55e" : "#097EF2"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis {...xAxisProps} fontSize={12} tickMargin={5} />
          <YAxis
            dataKey="equity"
            domain={["auto", "auto"]}
            tickCount={6}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            allowDecimals={false}
            axisLine={false}
            tickMargin={15}
            tickLine={false}
            fontSize={14}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* {referenceLines} */}
          <Area
            type="linear"
            dataKey="equity"
            name={strategy.name}
            stroke={theme === "dark" ? "#22c55e" : "#8884d8"}
            fillOpacity={1}
            fill="url(#colorUv)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioGrowth;
