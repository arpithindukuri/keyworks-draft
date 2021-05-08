import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Module from "../Module";

const useStyles = makeStyles((theme) => ({
	body: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
		height: "100%",
		padding: theme.spacing(2),
		paddingTop: 0,
		boxSizing: "border-box",
	},
}));

const oldData = [
	{
		name: "BQN",
		Low: 0,
		Medium: 0,
		High: 0,
		Complete: 0,
	},
	{
		name: "PQI",
		Low: 0,
		Medium: 0,
		High: 0,
		Complete: 0,
	},
	{
		name: "HIPAA",
		Low: 0,
		Medium: 0,
		High: 0,
		Complete: 0,
	},
	{
		name: "OLRA",
		Low: 0,
		Medium: 0,
		High: 0,
		Complete: 0,
	},
	{
		name: "Overall",
		Low: 0,
		Medium: 0,
		High: 0,
		Complete: 0,
	},
];

const newData = [
	{
		name: "BQN",
		Low: 40,
		Medium: 24,
		High: 26,
		Complete: 10,
	},
	{
		name: "PQI",
		Low: 30,
		Medium: 13,
		High: 27,
		Complete: 30,
	},
	{
		name: "HIPAA",
		Low: 20,
		Medium: 28,
		High: 12,
		Complete: 40,
	},
	{
		name: "OLRA",
		Low: 27,
		Medium: 40,
		High: 20,
		Complete: 13,
	},
	{
		name: "Overall",
		Low: 18,
		Medium: 42,
		High: 20,
		Complete: 20,
	},
];

export default function RegulatoryCompliance() {
	const classes = useStyles();

	const [data, setData] = useState(oldData);

	useEffect(() => {
		setTimeout(() => {
			setData(newData);
		}, 1500);
	}, []);

	return (
		<Module title='REGULATORY COMPLIANCE'>
			<div className={classes.body}>
				<ResponsiveContainer
					height='99%'
					width='99%'
					minHeight='0px'
					minWidth='0px'
				>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis type='number' domain={[0, 100]} />
						<Tooltip />
						<Legend />
						<Bar
							animationDuration={1000}
							dataKey='Low'
							stackId='a'
							fill='green'
						/>
						<Bar
							animationDuration={1000}
							dataKey='Medium'
							stackId='a'
							fill='orange'
						/>
						<Bar
							animationDuration={1000}
							dataKey='High'
							stackId='a'
							fill='red'
						/>
						<Bar
							animationDuration={1000}
							dataKey='Complete'
							stackId='a'
							fill='blue'
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</Module>
	);
}
