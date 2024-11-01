import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartComponentProps {
    chartData: {
        labels: string[];
        datasets: Array<{
            label: string;
            data: number[];
            backgroundColor: string;
            borderColor: string;
            borderWidth: number;
        }>;
    };
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    // Setup effect - runs once on mount
    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [chartData]); // Empty dependency array - only run on mount/unmount

    // Update effect - runs when chartData changes
    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.data = chartData;
            chartInstance.current.update();
        }
    }, [chartData]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;