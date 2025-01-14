import { ResponsiveContainer, ComposedChart } from "recharts";

interface NetIncomeChartData {
  year: number;
  net_worth: number;
}

const NetIncomeChart = ({ data }: { data: NetIncomeChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
        stackOffset="sign"
      >
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default NetIncomeChart;