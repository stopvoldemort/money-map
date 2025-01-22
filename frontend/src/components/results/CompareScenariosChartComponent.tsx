import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDollars, formatYAxis, ScenarioResults } from './shared';

const colors = [
  "rgba(0, 128, 0)",
  "rgba(65, 105, 225)",
  "rgba(128, 0, 128)",
  "rgba(139, 69, 19)",
  "rgba(255, 140, 0)",
  "rgba(255, 0, 0)"
]

const CompareScenariosChartComponent = ({ data }: { data: ScenarioResults[] }) => {
  const chartData = data[0]?.year_results.map((_, index) => {
    const entry: Record<string, number | string> = { year: data[0].year_results[index].year };
    entry["color"] = colors[index % colors.length];

    data.forEach((scenario) => {
      entry[scenario.name] = scenario.year_results[index]?.net_worth || 0;
    });

    return entry;
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(value) => formatYAxis(value)} />
        <Tooltip formatter={(value: number) => formatDollars(value)} />
        <Legend />
        {data.map((scenario, index) => (
          <Line
            key={scenario.id}
            type="monotone"
            dataKey={scenario.name}
            strokeWidth={2}
            stroke={colors[index % colors.length]}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CompareScenariosChartComponent;