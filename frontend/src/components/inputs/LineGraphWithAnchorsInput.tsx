// LineGraphWithAnchorsInput.tsx

import React from 'react';
import { FieldInputProps } from 'formik';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

export interface AnchorPoint {
  year: number;
  value: number; // Percentage between 0 and 100
}

const LineGraphWithAnchorsInput = (props: FieldInputProps<AnchorPoint[]>) => {
  const anchors = props.value;

  const width = 600;
  const height = 300;
  const padding = 40;

  // Scales to map data values to SVG coordinates
  const xScale = (year: number) =>
    ((year - 2024) / (2070 - 2024)) * (width - 2 * padding) + padding;

  const yScale = (value: number) =>
    height - padding - (value / 100) * (height - 2 * padding);

  // Generate the path data for the line
  const linePath = anchors
    .map((point, index) => {
      const x = xScale(point.year);
      const y = yScale(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const handleDrag = (index: number, newValue: number): void => {
    const updatedAnchors = [...anchors];
    updatedAnchors[index].value = newValue;
    props.onChange({
      type: "change",
      target: {
        type: "input",
        name: props.name,
        value: updatedAnchors,
      },
    })
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anchorRefs = React.useRef(anchors.map(() => React.createRef<any>()));

  return (
    <svg width={width} height={height}>
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

      {/* Line Path */}
      <path d={linePath} stroke="steelblue" fill="none" strokeWidth={2} />

      {/* Anchors */}
      {anchors.map((point, index) => {
        const x = xScale(point.year);
        const y = yScale(point.value);
        return (
          <Draggable
            key={point.year}
            axis="y"
            bounds={{ top: padding, bottom: height - padding }}
            position={{ x, y }}
            nodeRef={anchorRefs.current[index]}
            onDrag={(_: DraggableEvent, data: DraggableData) => {
              const newY = data.y;
              const newValue = Math.max(
                0,
                Math.min(
                  100,
                  ((height - padding - newY) / (height - 2 * padding)) * 100
                )
              );
              handleDrag(index, newValue); // Update anchors during drag
            }}
            onStop={(_: DraggableEvent, data: DraggableData) => {
              const newY = data.y;
              const newValue = Math.max(
                0,
                Math.min(
                  100,
                  ((height - padding - newY) / (height - 2 * padding)) * 100
                )
              );
              handleDrag(index, newValue); // Ensure anchors persist at drag-end
            }}
          >
            <circle
              ref={anchorRefs.current[index]}
              cx={0}
              cy={0}
              r={8}
              fill="red"
              stroke="none"
              cursor="pointer"
              onMouseDown={(e) => e.stopPropagation()}
            />
          </Draggable>
        );
      })}

      {/* X-Axis Labels */}
      {anchors.map((point) => (
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
