import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import useDashboardData from "../../../hooks/useDashboardData";

const WeeklyActivity = () => {
  const [selectedRange, setSelectedRange] = useState("daily");
  const { homeData, loading, error } = useDashboardData(selectedRange);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = homeData?.data?.chartData || [];
  const xLabels = chartData.map((item) => item.date) || [];
  const scores = chartData.map((item) => item.score) || [];

  return (
    <div className="border border-gray-300 p-5 rounded-xl">
      <div className="pb-3 flex items-center justify-between">
        <h4 className="font-semibold text-lg">Token Selling Activity</h4>
        <select
          className="text-sm px-2 py-1 rounded-md outline-none text-gray-500"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)} // No need to call refetch manually
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <LineChart
        height={300}
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
            tickLabelStyle: {
              fontSize: 12,
              fill: "#999",
            },
          },
        ]}
        yAxis={[
          {
            tickMinStep: 1,
            tickLabelStyle: {
              fontSize: 12,
              fill: "#999",
            },
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
        series={[
          {
            data: scores,
            color: "#3B82F6",
            curve: "monotone",
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        sx={{
          ".MuiLineElement-root": {
            strokeWidth: 1,
          },
          ".MuiMarkElement-root": {
            display: "none",
          },
          ".MuiChartsAxis-root .MuiChartsAxis-line": {
            stroke: "#E6E6E666",
          },
          ".MuiChartsGrid-root .MuiChartsGrid-line": {
            stroke: "#E6E6E666",
          },
        }}
      />
    </div>
  );
};

export default WeeklyActivity;