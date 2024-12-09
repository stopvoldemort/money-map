import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export interface YearsDynamicChartData {
  [year: number]: DynamicChartData[];
}

interface DynamicChartData {
  bins: string[];
  counts: number[];
}

const DynamicChartComponent: React.FC<{ data: YearsDynamicChartData }> = ({ data }) => {
  return (
    <div>
      <h3>Net Worth Histogram for 2024</h3>
      <BarChart
        width={600}
        height={200}
        data={data[2025]}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" label={{ value: "Net Worth ($)", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Frequency", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="percentage" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default DynamicChartComponent;