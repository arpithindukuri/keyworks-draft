import { useEffect, useRef, useState } from "react";

export default function DotGrid({
  numX,
  numY,
  heightSpace,
  radius = 4,
  thickness = 1,
  fill = "#aaa",
}: {
  numX: number;
  numY: number;
  heightSpace: number;
  radius?: number;
  thickness?: number;
  fill?: string;
}) {
  let dots = [];
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current?.clientWidth || 0);
  }, [ref.current?.clientWidth]);

  for (let indexWidth = 0; indexWidth <= numX; indexWidth++) {
    for (let indexHeight = 0; indexHeight < numY; indexHeight++) {
      const centerX = indexWidth * (width / numX);
      const centerY = indexHeight * heightSpace;
      const left = centerX - radius;
      const right = centerX + radius;
      const top = centerY - radius;
      const bottom = centerY + radius;
      dots.push(
        // <circle
        // 	key={`dashboard-dot-${indexWidth}-${indexHeight}`}
        // 	cx={indexWidth * (width / numX)}
        // 	cy={indexHeight * heightSpace}
        // 	r={radius}
        // />
        <line
          x1={left}
          y1={centerY}
          x2={right}
          y2={centerY}
          stroke-width={thickness}
        />,
        <line
          x1={centerX}
          y1={top}
          x2={centerX}
          y2={bottom}
          stroke-width={thickness}
        />
      );
    }
  }

  return (
    <svg
      ref={ref}
      width="100%"
      height="100%"
      // viewBox={`0 0 100% 100%`}
      version="1.1"
      overflow="visible"
    >
      <g fill={fill} stroke={fill}>
        {dots}
      </g>
    </svg>
  );
}
