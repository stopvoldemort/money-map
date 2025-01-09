import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TooltipProps } from 'recharts';
import { YEARS } from '../../constants';

export interface NetWorthChartData {
    year: number;
    net_worth: number;
    five_two_nine: number;
    investment: number;
    bank_account: number;
    roth_ira: number;
    debt: number;
}

// Format number to millions
const formatYAxis = (value: number) => {
    if (Math.abs(value) >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    } else if (Math.abs(value) >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
};

// Custom tooltip component
// Only needed because the tooltip text was inheriting the opacity from the bar "fill" colors
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
                <p style={{ padding: 0, margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
                {payload.map((entry, index) => (
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
                        <span>{entry.name}  </span>
                        <span className="ms-5">${Math.round(entry.value ?? 0).toLocaleString()}</span>
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

const CustomizedDot = (props: { cx: number; cy: number; payload: NetWorthChartData }) => {
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
                        {formatYAxis(payload.net_worth)}
                    </text>
                </>
            ) : null}
        </g>
    );
}

const NetWorthChart = ({ data }: { data: NetWorthChartData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={20}
                stackOffset="sign"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'bottom' }} />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip content={<CustomTooltip />} />

                <Line
                    type="monotone"
                    dataKey="net_worth"
                    stroke="#000000"
                    strokeWidth={2}
                    name="Net Worth"
                    dot={CustomizedDot}
                />
                <Bar dataKey="debt" stackId="stack" fill="rgba(255, 0, 0, 0.2)" stroke="rgb(255, 0, 0)" strokeWidth={1} name="Debt" />
                <Bar dataKey="bank_account" stackId="stack" fill="rgba(0, 128, 0, 0.2)" stroke="rgb(0, 128, 0)" strokeWidth={1} name="Bank accounts" />
                <Bar dataKey="investment" stackId="stack" fill="rgba(0, 0, 255, 0.2)" stroke="rgb(0, 0, 255)" strokeWidth={1} name="Investment accounts" />
                <Bar dataKey="retirement" stackId="stack" fill="rgba(65, 105, 225, 0.2)" stroke="rgb(65, 105, 225)" strokeWidth={1} name="Traditional IRA/401k accounts" />
                <Bar dataKey="roth_ira" stackId="stack" fill="rgba(128, 0, 128, 0.2)" stroke="rgb(128, 0, 128)" strokeWidth={1} name="Roth IRA/401k accounts" />
                <Bar dataKey="five_two_nine" stackId="stack" fill="rgba(139, 69, 19, 0.2)" stroke="rgb(139, 69, 19)" strokeWidth={1} name="529 accounts" />
                <Bar dataKey="assets" stackId="stack" fill="rgba(255, 140, 0, 0.2)" stroke="rgb(255, 140, 0)" strokeWidth={1} name="Assets" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default NetWorthChart;