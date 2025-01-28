import { useState } from "react";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Bar, Line } from "recharts";
import { ChartElement, ScenarioResults, ScenarioYearResults, formatDollars, formatYAxis } from "./shared";
import { YEARS } from "../../constants";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";


export interface NetIncomeChartData {
  year: number;
  expenses: ChartElement[];
  taxes: ChartElement[];
  incomes: ChartElement[];
  debt_payments: ChartElement[];
  netIncome: number;
  totalExpenses: number;
  totalTaxes: number;
  totalDebtPayments: number;
  totalIncomes: number;
}

const TooltipContent = ({ label, year, total, netIncome, items, color }: { label: string, year: number, total: number, netIncome: number, items: ChartElement[], color: string }) => {
  return (
    <div className="custom-tooltip" style={{ backgroundColor: "white", border: "1px solid #ccc", padding: '10px', minWidth: '250px' }}>
      <p style={{ padding: 0, margin: 0, fontWeight: 'bold' }}>{year}</p>
      <p style={{ padding: 0, margin: 0 }}>{`Cash Flow: ${formatDollars(netIncome)}`}</p>
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

const CustomTooltip = ({ active, payload, hoveredBar }: TooltipProps<ValueType, NameType> & { hoveredBar: string | null }) => {
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
        <TooltipContent label="Available income" {...rowData} total={rowData.totalIncomes} items={rowData.incomes} color={color} />
      );
    case "totalExpenses":
      return (
        <TooltipContent label="Expenses" {...rowData} total={rowData.totalExpenses} items={rowData.expenses} color={color} />
      );
    case "totalTaxes":
      return (
        <TooltipContent label="Taxes" {...rowData} total={rowData.totalTaxes} items={rowData.taxes} color={color} />
      );
    case "totalDebtPayments":
      return (
        <TooltipContent label="Debt Payments" {...rowData} total={rowData.totalDebtPayments} items={rowData.debt_payments} color={color} />
      );
    default:
      return (
        <></>
      );
  }
};

function prepareNetIncomeChartData(data: ScenarioYearResults[]): NetIncomeChartData[] {
  return data.map((d) => {
    const totalExpenses = d.expenses.reduce((sum, item) => sum + item.value, 0);
    const totalTaxes = d.taxes?.reduce((sum, item) => sum + item.value, 0) || 0;
    const totalDebtPayments = d.debt_payments?.reduce((sum, item) => sum + item.value, 0) || 0;
    const totalIncomes = d.incomes.reduce((sum, item) => sum + item.value, 0);
    const netIncome = totalIncomes + totalDebtPayments + totalExpenses + totalTaxes;

    return {
      ...d,
      netIncome,
      totalExpenses,
      totalTaxes,
      totalDebtPayments,
      totalIncomes,
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

const NetIncomeChart = ({ data, activeScenarioId }: { data: ScenarioResults[], activeScenarioId: string | null }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const activeScenario = data.find(scenario => scenario.id === activeScenarioId);

  if (!activeScenario) {
    return <div>No active scenario</div>;
  }

  const chartData = prepareNetIncomeChartData(activeScenario.year_results);

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
          dataKey="totalIncomes"
          stroke="rgb(0, 128, 0)"
          fill="rgb(0, 128, 0, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalIncomes")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalDebtPayments"
          stroke="rgb(255, 0, 0)"
          fill="rgb(255, 0, 0, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalDebtPayments")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalTaxes"
          stroke="rgb(255, 60, 60)"
          fill="rgb(255, 60, 60, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalTaxes")}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <Bar
          stackId="stack"
          dataKey="totalExpenses"
          stroke="rgb(255, 140, 140)"
          fill="rgb(255, 140, 140, 0.2)"
          strokeWidth={1}
          onMouseEnter={() => setHoveredBar("totalExpenses")}
          onMouseLeave={() => setHoveredBar(null)}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default NetIncomeChart;