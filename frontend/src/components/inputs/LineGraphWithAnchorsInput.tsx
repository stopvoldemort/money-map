import React, { useState } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { FieldInputProps } from 'formik';

export interface AnchorPoint {
  year: number;
  value: number; // Percentage between 0 and 100
}

export interface LineData {
  name: string;
  color: string;
  anchors: AnchorPoint[];
}

interface LineGraphWithAnchorsInputProps extends FieldInputProps<LineData[]> {
  width?: number;
  height?: number;
}

const LineGraphWithAnchorsInput: React.FC<LineGraphWithAnchorsInputProps> = ({
  value: linesData,
  onChange,
  name,
  width = 600,
  height = 300,
}) => {
  const padding = 40;

  // Scales to map data values to SVG coordinates
  const xScale = (year: number) =>
    ((year - 2024) / (2070 - 2024)) * (width - 2 * padding) + padding;

  const yScale = (value: number) =>
    height - padding - (value / 100) * (height - 2 * padding);

  // Compute sum of percentages at each year
  const yearSums: Record<number, number> = {};
  linesData[0].anchors.forEach((_, index) => {
    const year = linesData[0].anchors[index].year;
    const sum = linesData.reduce(
      (acc, line) => acc + line.anchors[index].value,
      0
    );
    yearSums[year] = sum;
  });

  // State to track hovered and dragged anchors
  const [hoveredAnchor, setHoveredAnchor] = useState<{
    lineIndex: number;
    anchorIndex: number;
  } | null>(null);

  const [draggingAnchor, setDraggingAnchor] = useState<{
    lineIndex: number;
    anchorIndex: number;
  } | null>(null);

  const handleDrag = (
    lineIndex: number,
    anchorIndex: number,
    newValue: number
  ): void => {
    newValue = Math.round(Math.max(0, Math.min(100, newValue)));

    const updatedLinesData = [...linesData];
    updatedLinesData[lineIndex] = {
      ...updatedLinesData[lineIndex],
      anchors: [...updatedLinesData[lineIndex].anchors],
    };
    updatedLinesData[lineIndex].anchors[anchorIndex] = {
      ...updatedLinesData[lineIndex].anchors[anchorIndex],
      value: newValue,
    };

    onChange({
      target: {
        name,
        value: updatedLinesData,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anchorRefs = React.useRef<any[][]>(
    linesData.map((line) => line.anchors.map(() => React.createRef()))
  );

  return (
    <svg width={width} height={height} style={{ margin: '20px' }}>
      {/* Legend */}
      <g transform={`translate(${width - padding - 100}, ${padding})`}>
        <rect x={0} y={0} width={10} height={10} fill="steelblue" />
        <text x={15} y={10} fontSize={10}>
          Stocks
        </text>
        <rect x={0} y={20} width={10} height={10} fill="green" />
        <text x={15} y={30} fontSize={10}>
          Bonds
        </text>
      </g>
      {/* X-Axis */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="black"
      />
      {/* Y-Axis */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="black"
      />

      {/* Lines and Anchors */}
      {linesData.map((lineData, lineIndex) => {
        // Generate the path data for the line
        const linePath = lineData.anchors
          .map((point, index) => {
            const x = xScale(point.year);
            const y = yScale(point.value);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ');

        return (
          <React.Fragment key={lineData.name}>
            {/* Line Path */}
            <path
              d={linePath}
              stroke={lineData.color}
              fill="none"
              strokeWidth={2}
            />

            {/* Anchors */}
            {lineData.anchors.map((point, anchorIndex) => {
              const x = xScale(point.year);
              const y = yScale(point.value);
              const year = point.year;
              const sumAtYear = yearSums[year];

              // Determine if the sum at this year equals 100%
              const isSum100 = sumAtYear === 100;

              const isHovered =
                hoveredAnchor &&
                hoveredAnchor.lineIndex === lineIndex &&
                hoveredAnchor.anchorIndex === anchorIndex;

              const isDragging =
                draggingAnchor &&
                draggingAnchor.lineIndex === lineIndex &&
                draggingAnchor.anchorIndex === anchorIndex;

              return (
                <React.Fragment key={`${lineData.name}-${point.year}`}>
                  <Draggable
                    axis="y"
                    bounds={{ top: padding, bottom: height - padding }}
                    position={{ x, y }}
                    nodeRef={anchorRefs.current[lineIndex][anchorIndex]}
                    onStart={() => {
                      setDraggingAnchor({ lineIndex, anchorIndex });
                    }}
                    onDrag={(_: DraggableEvent, data: DraggableData) => {
                      const newY = data.y;
                      const newValue =
                        ((height - padding - newY) / (height - 2 * padding)) *
                        100;
                      handleDrag(lineIndex, anchorIndex, newValue);
                    }}
                    onStop={() => {
                      setDraggingAnchor(null);
                    }}
                  >
                    <circle
                      ref={anchorRefs.current[lineIndex][anchorIndex]}
                      cx={0}
                      cy={0}
                      r={8}
                      fill={isSum100 ? lineData.color : 'white'}
                      stroke={lineData.color}
                      cursor="pointer"
                      onMouseEnter={() =>
                        setHoveredAnchor({ lineIndex, anchorIndex })
                      }
                      onMouseLeave={() => setHoveredAnchor(null)}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </Draggable>

                  {/* Display value when hovered or dragging */}
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize={12}
                    fill="black"
                    stroke="white"
                    strokeWidth={0.5}
                  >
                    {point.value.toFixed()}%
                  </text>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* X-Axis Labels */}
      {linesData[0].anchors.map((point) => (
        <text
          key={`x-label-${point.year}`}
          x={xScale(point.year)}
          y={height - padding + 15}
          textAnchor="middle"
          fontSize={10}
        >
          {point.year}
        </text>
      ))}

      {/* Y-Axis Labels */}
      {[0, 25, 50, 75, 100].map((val) => (
        <text
          key={`y-label-${val}`}
          x={padding - 10}
          y={yScale(val) + 5}
          textAnchor="end"
          fontSize={10}
        >
          {val}%
        </text>
      ))}
    </svg>
  );
};

export default LineGraphWithAnchorsInput;
