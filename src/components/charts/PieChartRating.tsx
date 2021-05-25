import { createStyles, fade, makeStyles, useTheme } from "@material-ui/core";
import { useState } from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getColor } from "../../util";

const useStyles = makeStyles((theme) =>
	createStyles({
		"@keyframes fadeIn": {
			"0%": {
				opacity: 0,
				transform: "translateY(2rem) scale(0.95)",
			},
			"100%": {
				opacity: 1,
				transform: "translateY(0)",
			},
		},
		fadeIn: {
			animation: "$fadeIn 1.5s ease backwards 1s",
			transformOrigin: "center",
		},
	})
);

export default function PieChartRating({
	percent,
	inverse = false,
}: {
	percent: number;
	inverse?: boolean;
}) {
	const [num, setNum] = useState(0);

	const data = [
		{
			name: "Group A",
			value: Math.round(num * 100),
		},
		{
			name: "Group B",
			value: Math.round((1 - num) * 100),
		},
	];

	const classes = useStyles();
	const theme = useTheme();
	const color = getColor(percent, inverse);

	return (
		<ResponsiveContainer minHeight={150}>
			<PieChart>
				<Pie
					data={data}
					dataKey='value'
					nameKey='name'
					startAngle={90}
					endAngle={-270}
					paddingAngle={5}
					innerRadius='85%'
					outerRadius='100%'
					animationDuration={1000}
					onAnimationEnd={() => {
						if (num !== percent) setNum(percent);
					}}
				>
					{data.map((entry, index) => (
						<Cell fill={index === 0 ? color : fade(color, 0.2)} />
					))}
					<Label
						className={classes.fadeIn}
						value={`${Math.round(percent * 100)}%`}
						position='center'
						dominantBaseline='center'
						fontSize={theme.typography.h4.fontSize}
						fontWeight={600}
						fill={color}
					/>
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
