import {
	Card,
	makeStyles,
	CardContent,
	Divider,
	Typography,
	CardActions,
	Button,
	Collapse,
	Chip,
} from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import { createStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getColor } from "../../../util";
import classNames from "classnames";
import { useState } from "react";
import FrameworkControlList from "./FrameworkControlList";
import { alertType, controlType } from "./AllOverviews";

const useStyles = makeStyles((theme) =>
	createStyles({
		card: {
			minHeight: "300px",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			transition: "0.3s",
			marginTop: theme.spacing(3),
			"&:first-child": {
				marginTop: 0,
			},
			borderRadius: 0,
		},
		cardHeader: {
			padding: theme.spacing(1),
		},
		cardTitle: {
			fontWeight: 800,
			color: theme.palette.text.secondary,
			textAlign: "center",
		},
		cardContent: {
			display: "flex",
		},
		cardSummary: {
			display: "flex",
			flexDirection: "column",
			width: "30%",
			justifyContent: "center",
		},
		cardSummaryTitle: {
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
		cardSummaryPercent: {
			textAlign: "center",
			fontWeight: 700,
			margin: theme.spacing(2.5),
		},
		slidingChart: {
			display: "flex",
			width: "100%",
			height: "25px",
			marginTop: theme.spacing(1),
		},
		chipsContainer: {
			display: "flex",
			marginTop: theme.spacing(2),
			justifyContent: "center",
		},
		cardDetails: {
			display: "flex",
			flexDirection: "column",
			width: "70%",
			height: "100%",
			maxHeight: "450px",
			overflow: "visible",
			overflowY: "auto",
		},
		alert: {
			marginTop: theme.spacing(1),
			"&:first-child": {
				marginTop: 0,
			},
		},
		expandButton: {
			marginLeft: "auto",
			marginRight: "auto",
		},
		expandIcon: {
			transform: "rotate(0deg)",
			marginLeft: "auto",
			transition: theme.transitions.create("transform", {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandIconOpen: {
			transform: "rotate(180deg)",
		},
	})
);

export default function FrameworkOverview({
	title,
	percent,
	alerts,
	controls,
}: {
	title: string;
	percent: number;
	alerts: alertType[];
	controls: controlType[];
}) {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	let numViolations = 0;
	controls.forEach((item) => {
		numViolations += item.violations;
	});

	let numAlerts = 0;
	controls.forEach((item) => {
		if (item.needsReview) numAlerts += 1;
	});

	return (
		<Card className={classes.card} elevation={3}>
			<CardContent className={classes.cardContent}>
				<div className={classes.cardSummary}>
					<Typography className={classes.cardTitle} variant='h4'>
						{title}
					</Typography>
					<Typography
						className={classes.cardSummaryTitle}
						variant='h6'
					>
						Compliance
					</Typography>
					<Typography
						className={classes.cardSummaryPercent}
						variant='h2'
					>
						{`${Math.floor(percent * 100)}%`}
					</Typography>
					<div className={classes.slidingChart}>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart
								layout='vertical'
								data={[
									{
										name: "",
										amt: Math.round(percent * 100),
										rest: Math.round((1 - percent) * 100),
									},
								]}
								margin={{ left: 24, right: 24 }}
							>
								<XAxis
									type='number'
									tickFormatter={(tick) => {
										return `${tick}%`;
									}}
									ticks={[0, 25, 50, 75, 100]}
									domain={[0, 100]}
									minTickGap={0}
									interval={0}
									hide
								/>
								<YAxis dataKey='name' type='category' hide />
								<Bar
									dataKey='amt'
									stackId='a'
									fill={getColor(percent, true)}
									radius={[50, 0, 0, 50]}
								/>
								<Bar
									dataKey='rest'
									stackId='a'
									fill='#dddddd'
									radius={[0, 50, 50, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className={classes.chipsContainer}>
						<Chip
							label={`${numViolations} violations found`}
							style={{
								margin: "0 8px",
								color: "white",
								backgroundColor:
									numViolations === 0
										? getColor(0)
										: getColor(1),
							}}
						/>
						<Chip
							label={`${numAlerts} items need your attention`}
							style={{
								margin: "0 8px",
								color: "white",
								backgroundColor:
									numAlerts === 0
										? getColor(0)
										: getColor(0.5),
							}}
						/>
					</div>
				</div>
				<Divider
					orientation='vertical'
					flexItem
					style={{ margin: "0 16px" }}
				/>
				<div className={classes.cardDetails}>
					{alerts.map((item, index) =>
						index < 3 ? (
							<Alert
								className={classes.alert}
								severity={item.severity}
								action={
									<Button color='inherit' size='small'>
										{item.severity === "success"
											? "DISMISS"
											: "HOW TO FIX"}
									</Button>
								}
							>
								<AlertTitle>{item.title}</AlertTitle>
								{item.text}
							</Alert>
						) : null
					)}
					<Collapse
						in={expanded}
						timeout='auto'
						// unmountOnExit
						// collapsedHeight={100}
					>
						{alerts.map((item, index) =>
							index >= 3 ? (
								<Alert
									className={classes.alert}
									severity={item.severity}
									style={{
										marginTop: index === 3 ? "8px" : "",
									}}
									action={
										<Button color='inherit' size='small'>
											DISMISS
										</Button>
									}
								>
									<AlertTitle>{item.title}</AlertTitle>
									{item.text}
								</Alert>
							) : null
						)}
					</Collapse>
				</div>
			</CardContent>
			<CardActions disableSpacing>
				<Button
					className={classes.expandButton}
					onClick={handleExpandClick}
					endIcon={
						<ExpandMoreIcon
							className={classNames(classes.expandIcon, {
								[classes.expandIconOpen]: expanded,
							})}
						/>
					}
				>
					{expanded ? "Show Less" : "Show More"}
				</Button>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<FrameworkControlList rows={controls} />
				</CardContent>
			</Collapse>
		</Card>
	);
}
