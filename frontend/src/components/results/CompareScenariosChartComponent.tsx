import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { formatDollars, formatYAxis, ScenarioResults } from './shared';

const colors = [
  "rgba(0, 128, 0)",
  "rgba(65, 105, 225)",
  "rgba(128, 0, 128)",
  "rgba(139, 69, 19)",
  "rgba(255, 140, 0)",
  "rgba(255, 0, 0)"
]

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', minWidth: '250px' }}>
        <p style={{ padding: 0, margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
        {payload.map((entry, index) => (
          entry.value !== 0 && (
            <p
              key={`item-${index}`}
              style={{
                color: entry.stroke,
                opacity: 1,
                padding: 0,
                margin: 0,
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: entry.name === 'Net Worth' ? 'bold' : 'normal'
              }}
            >
              <span className="text-start">{entry.name}</span>
              <span className="ms-5">{formatDollars(entry.value ?? 0)}</span>
            </p>
          )
        ))}
      </div>
    );
  }

  return null;
};

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
        <Tooltip content={<CustomTooltip />} />
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