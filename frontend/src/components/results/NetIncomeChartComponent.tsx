import { useState } from "react";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Bar, Line } from "recharts";
import { ChartElement, ChartData, formatDollars, formatYAxis } from "./shared";
import { YEARS } from "../../constants";


export interface NetIncomeChartData {
  year: number;
  expenses: ChartElement[];
  taxes: ChartElement[];
  incomes: ChartElement[];
  capital_gains: ChartElement[];
  debt_interest: ChartElement[];
  netIncome: number;
  totalExpenses: number;
  totalTaxes: number;
  totalDebtInterest: number;
  totalIncomes: number;
  totalCapitalGains: number;
}

const TooltipContent = ({ label, year, total, netIncome, items, color }: { label: string, year: number, total: number, netIncome: number, items: ChartElement[], color: string }) => {
  return (
    <div className="custom-tooltip" style={{ backgroundColor: "white", border: "1px solid #ccc", padding: '10px', width: '400px' }}>
      <p style={{ padding: 0, margin: 0, fontWeight: 'bold' }}>{year}</p>
      <p style={{ padding: 0, margin: 0 }}>{`Net Income: ${formatDollars(netIncome)}`}</p>
      <p style={{
        opacity: 1,
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        color: color
      }}>
        <span>{label}</span>
        <span className="ms-5">{formatDollars(total)}</span>
      </p>
      {items.map((item: ChartElement, index: number) => (
        <p
          key={`item-${index}`}
          style={{
            color: color,
            opacity: 1,
            padding: 0,
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{item.name}</span>
          <span className="ms-5">{formatDollars(item.value)}</span>
        </p>
      ))}
    </div>
  );
}

const CustomTooltip = ({ active, payload, hoveredBar }: TooltipProps<number, string> & { hoveredBar: string | null }) => {
  if (!active || !payload || !payload.length || !hoveredBar) {
    return null;
  }

  const p = payload.find(p => p.dataKey === hoveredBar);

  if (!p) {
    return null;
  }

  const color = p.stroke;
  const rowData = p.payload;

  switch (hoveredBar) {
    case "totalIncomes":
      return (
        <TooltipContent label="Income" {...rowData} total={rowData.totalIncomes} items={rowData.incomes} color={color} />
      );
    case "totalExpenses":
      return (
        <TooltipContent label="Expenses" {...rowData} total={rowData.totalExpenses} items={rowData.expenses} color={color} />
      );
    case "totalTaxes":
      return (
        <TooltipContent label="Taxes" {...rowData} total={rowData.totalTaxes} items={rowData.taxes} color={color} />
      );
    case "totalCapitalGains":
      return (
        <TooltipContent label="Capital Gains" {...rowData} total={rowData.totalCapitalGains} items={rowData.capital_gains} color={color} />
      );
    case "totalDebtInterest":
      return (
        <TooltipContent label="Debt Interest" {...rowData} total={rowData.totalDebtInterest} items={rowData.debt_interest} color={color} />
      );
    default:
      return (
        <></>
      );
  }
};

function prepareNetIncomeChartData(data: ChartData[]): NetIncomeChartData[] {
  return data.map((d) => {
    const totalExpenses = d.expenses.reduce((sum, item) => sum + item.value, 0);
    const totalTaxes = d.taxes?.reduce((sum, item) => sum + item.value, 0) || 0;
    const totalDebtInterest = d.debt_interest?.reduce((sum, item) => sum + item.value, 0) || 0;
    const totalIncomes = d.incomes.reduce((sum, item) => sum + item.value, 0);
    const totalCapitalGains = d.capital_gains?.reduce((sum, item) => sum + item.value, 0) || 0;
    const netIncome = totalIncomes + totalCapitalGains + totalExpenses + totalTaxes + totalDebtInterest;

    return {
      ...d,
      netIncome,
      totalExpenses,
      totalTaxes,
      totalDebtInterest,
      totalIncomes,
      totalCapitalGains
    };
  });
}

const CustomizedDot = (props: { cx: number; cy: number; payload: NetIncomeChartData }) => {
  const { cx, cy, payload } = props;
  return (
    <g key={payload.year}>
      {(payload.year - YEARS.START) % 5 === 0 ? (
        <>
          <circle cx={cx} cy={cy} r={4} fill="black" />
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fill="black"
          >
            {formatDollars(payload.netIncome)}
          </text>
        </>
      ) : null}
    </g>
  );
}

const NetIncomeChart = ({ data }: { data: ChartData[] }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const chartData = prepareNetIncomeChartData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
        stackOffset="sign"
      >
        <XAxis dataKey="year" />
        <YAxis tickFormatter={formatYAxis} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={({ active, payload }) => <CustomTooltip active={active} payload={payload} hoveredBar={hoveredBar} />} />
        <Line
          type="monotone"
          dataKey="netIncome"
          stroke="#000000"
          strokeWidth={2}
          name="Net Worth"
          dot={CustomizedDot}
        />
        <Bar
          stackId="stack"
          dataKey="totalExpenses"
          stroke="rgb(255, 0, 0)"
          fill="rgb(255, 0, 0, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalExpenses")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalTaxes"
          stroke="rgb(255, 102, 102)"
          fill="rgb(255, 102, 102, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalTaxes")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalIncomes"
          stroke="rgb(0, 128, 0)"
          fill="rgb(0, 128, 0, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalIncomes")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalCapitalGains"
          stroke="rgb(102, 204, 102)"
          fill="rgb(102, 204, 102, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalCapitalGains")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalDebtInterest"
          stroke="rgb(255, 180, 180)"
          fill="rgb(255, 180, 180, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalDebtInterest")}
          onMouseLeave={() => setHoveredBar(null)}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default NetIncomeChart;