import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface NetWorthChartData {
    year: number;
    net_worth: number;
    five_two_nine: number;
    investment: number;
    bank_account: number;
    roth_ira: number;
    debt: number;
}


const NetWorthChart = ({ data }: { data: NetWorthChartData[] }) => {
    // Format number to millions
    const formatYAxis = (value: number) => {
        if (Math.abs(value) >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (Math.abs(value) >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toFixed(0)}`;
    };

    // Format tooltip values to dollars
    const formatTooltip = (value: number) => `$${Math.round(value).toLocaleString()}`;

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="year"
                    label={{ value: 'Year', position: 'bottom' }}
                />
                <YAxis
                    tickFormatter={formatYAxis}
                />
                <Tooltip formatter={formatTooltip} />

                <Line
                    type="monotone"
                    dataKey="net_worth"
                    stroke="#000000"
                    strokeWidth={2}
                    name="Net Worth"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="five_two_nine"
                    stroke="#8B4513"
                    name="529"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="#0000FF"
                    name="Investments"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="debt"
                    stroke="#FF0000"
                    name="Debt"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="roth_ira"
                    stroke="#800080"
                    name="Roth IRA"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="bank_account"
                    stroke="#008000"
                    name="Bank Account"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default NetWorthChart;