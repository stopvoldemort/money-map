import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { default_response } from '../../default_response';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NetWorthChart = ({ data }: { data: any }) => {
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
            </LineChart>
        </ResponsiveContainer>
    );
};

export default NetWorthChart;