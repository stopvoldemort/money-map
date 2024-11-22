import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Scatter,
} from 'recharts';

interface AnchorPoint {
  year: number;
  value: number; // Percentage between 0 and 100
}

const initialAnchors: AnchorPoint[] = [];
for (let year = 2024; year <= 2070; year += 5) {
  initialAnchors.push({ year, value: 50 }); // Starting at 50%
}

interface DraggableScatterProps {
  data: AnchorPoint[];
  onPointDrag: (point: AnchorPoint) => void;
}



const DraggableScatter: React.FC<DraggableScatterProps> = ({ data, onPointDrag }) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleMouseDown = useCallback((index: number) => {
    console.log('handleMouseDown', index);
    setDraggingIndex(index);
  }, [setDraggingIndex]);

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
  }, [setDraggingIndex]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!data) return;
      if (draggingIndex === null) return;

      const target = e.target as SVGElement;
      const svg = target.ownerSVGElement;

      if (!svg) return;

      const point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      const ctm = svg.getScreenCTM()?.inverse();
      if (!ctm) return;

      const { y } = point.matrixTransform(ctm);
      const yAxisHeight = svg.clientHeight;

      const value = Math.max(0, Math.min(100, 100 - ((y / yAxisHeight) * 100)));

      onPointDrag({
        year: data[draggingIndex].year,
        value,
      });
    },
    [data, draggingIndex, onPointDrag] // Dependencies of this function
  );

  useEffect(() => {
    if (draggingIndex !== null) {
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingIndex, handleMouseMove, handleMouseUp, handleMouseDown]);

  return (
    <Scatter
      data={data}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shape={(props: any) => {
        console.log('shape', props);
        return (
          <circle
            // {...props}
            onMouseDown={() => handleMouseDown(props.index)}
            r={8}
            fill="red"
            stroke="none"
            cursor="pointer"
          />
        )
      }}
    />
  );
};

interface LineGraphProps {
  anchors: AnchorPoint[];
  onAnchorChange: (anchors: AnchorPoint[]) => void;
}

const LineGraphWithAnchorsInput: React.FC<LineGraphProps> = ({ anchors, onAnchorChange }) => {
  const data = anchors.map(point => ({ ...point }));

  const handlePointDrag = (newPoint: AnchorPoint) => {
    const updatedAnchors = anchors.map(anchor =>
      anchor.year === newPoint.year ? newPoint : anchor
    );
    onAnchorChange(updatedAnchors);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="year"
          type="number"
          domain={[2024, 2070]}
          tickCount={10}
        />
        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        <DraggableScatter data={data} onPointDrag={handlePointDrag} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraphWithAnchorsInput;
