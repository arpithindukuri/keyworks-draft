import { useEffect, useRef, useState } from "react";

export default function DotGrid({
	numX,
	numY,
	heightSpace,
	radius = 1.5,
	fill = "#888",
}: {
	numX: number;
	numY: number;
	heightSpace: number;
	radius?: number;
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
			dots.push(
				<circle
					key={`dashboard-dot-${indexWidth}-${indexHeight}`}
					cx={indexWidth * (width / numX)}
					cy={indexHeight * heightSpace}
					r={radius}
				/>
			);
		}
	}

	return (
		<svg
			ref={ref}
			width='100%'
			height='100%'
			viewBox={`0 0 100% 100%`}
			version='1.1'
			overflow='visible'
		>
			<g fill={fill}>{dots}</g>
		</svg>
	);
}
