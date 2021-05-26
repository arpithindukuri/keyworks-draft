import { Card, makeStyles, Typography } from "@material-ui/core";
import Module from "../Module";
import PieChartRating from "./PieChartRating";

const useStyles = makeStyles((theme) => ({
	body: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
		height: "100%",
		overflowX: "auto",
		padding: theme.spacing(2),
		boxSizing: "border-box",
	},
	ratingCard: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		padding: theme.spacing(3),
		minWidth: "130px",
		maxHeight: "100%",
		marginLeft: `${theme.spacing(3)}px`,
		"&:first-child": {
			marginLeft: 0,
		},
	},
	ratingCardTitle: {
		// color: "white",
	},
	ratingCardNumber: {
		color: "grey",
		fontWeight: 600,
	},
	responsive: {
		marginTop: theme.spacing(1),
	},
}));

export function RatingCard({
	title,
	percent,
}: {
	title: string;
	percent: number;
}) {
	const classes = useStyles();

	return (
		<Card
			className={classes.ratingCard}
			// elevation={5}
			variant='outlined'
		>
			<Typography className={classes.ratingCardTitle} variant='h6'>
				{title}
			</Typography>
			<PieChartRating percent={percent} />
		</Card>
	);
}

export default function Ratings() {
	const classes = useStyles();

	return (
		<Module title='RATINGS'>
			{/* <div
				style={{
					margin: "0px 16px",
					height: "100%",
					width: "100%",
					boxSizing: "border-box",
					overflowX: "auto",
				}}
			> */}
			<div className={classes.body}>
				<RatingCard title='Risk' percent={0.17} />
				<RatingCard title='Compliance' percent={0.55} />
			</div>
			{/* </div> */}
		</Module>
	);
}
