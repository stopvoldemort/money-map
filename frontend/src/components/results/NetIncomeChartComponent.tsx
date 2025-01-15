import { useState } from "react";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Bar, Line } from "recharts";
import { formatYAxis, ChartElement, ChartData } from "./shared";
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

const TooltipContent = ({ label, year, total, items }: { label: string, year: number, total: number, items: ChartElement[] }) => {
  return (
    <div className="custom-tooltip" style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: 10 }}>
      <strong>{`${label}: ${year}`}</strong>
      <div>{`Total: $${total}`}</div>
      {items.map((item: ChartElement) => (
        <div key={item.name}>{`${item.name}: $${item.value}`}</div>
      ))}
    </div>
  );
}

const CustomTooltip = ({ active, payload, hoveredBar }: TooltipProps<number, string> & { hoveredBar: string | null }) => {
  if (!active || !payload || !payload.length || !hoveredBar) {
    return null;
  }

  const rowData = payload[0].payload;

  switch (hoveredBar) {
    case "totalIncomes":
      return (
        <TooltipContent label="Income" year={rowData.year} total={rowData.totalIncomes} items={rowData.incomes} />
      );
    case "totalExpenses":
      return (
        <TooltipContent label="Expenses" year={rowData.year} total={rowData.totalExpenses} items={rowData.expenses} />
      );
    case "totalTaxes":
      return (
        <TooltipContent label="Taxes" year={rowData.year} total={rowData.totalTaxes} items={rowData.taxes} />
      );
    case "totalCapitalGains":
      return (
        <TooltipContent label="Capital Gains" year={rowData.year} total={rowData.totalCapitalGains} items={rowData.capital_gains} />
      );
    case "totalDebtInterest":
      return (
        <TooltipContent label="Debt Interest" year={rowData.year} total={rowData.totalDebtInterest} items={rowData.debt_interest} />
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
            {formatYAxis(payload.netIncome)}
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
        <YAxis />
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