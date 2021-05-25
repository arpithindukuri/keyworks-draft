import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	makeStyles,
	Badge,
	IconButton,
	Collapse,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getColor } from "../../../util";
import { useState } from "react";
import { controlType } from "./AllOverviews";
import classNames from "classnames";

const useStyles = makeStyles((theme) =>
	createStyles({
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
		tableBody: {
			display: "flex",
			flexGrow: 1,
			width: "100%",
			height: "100%",
			boxSizing: "border-box",
			overflowY: "auto",
		},
		headerCell: {
			fontWeight: 800,
		},
		tableCell: {
			borderBottom: 0,
		},
		avatar: {
			margin: 0,
		},
	})
);

export default function FrameworkControlList({
	rows,
}: {
	rows: controlType[];
}) {
	const classes = useStyles();

	return (
		<div className={classes.tableBody}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={classes.headerCell} align='right'>
							Control
						</TableCell>
						<TableCell className={classes.headerCell} align='left'>
							Description
						</TableCell>
						<TableCell
							className={classes.headerCell}
							align='center'
						>
							Severity
						</TableCell>
						<TableCell
							className={classes.headerCell}
							align='center'
						>
							Violations
						</TableCell>
						<TableCell
							className={classes.headerCell}
							align='center'
						/>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row row={row} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function Row({ row }: { row: controlType }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow key={`${row.control}-tablerow`}>
				<TableCell
					className={classes.tableCell}
					component='th'
					scope='row'
					align='right'
				>
					{row.control}
				</TableCell>
				<TableCell className={classes.tableCell} align='left'>
					{row.description}
				</TableCell>
				<TableCell className={classes.tableCell} align='center'>
					<SeverityChip
						severity={row.severity}
						title={row.severity}
					/>
				</TableCell>
				<TableCell
					className={classes.tableCell}
					align='center'
					padding='none'
				>
					<ViolationsChip number={row.violations} />
				</TableCell>
				<TableCell
					className={classes.tableCell}
					align='center'
					padding='none'
				>
					<IconButton
						onClick={() => {
							setOpen((prev) => !prev);
						}}
					>
						<Badge
							invisible={!row.needsReview}
							color='error'
							variant='dot'
						>
							<ExpandMoreIcon
								className={classNames(classes.expandIcon, {
									[classes.expandIconOpen]: open,
								})}
							/>
						</Badge>
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow key={`${row.control}-tablerow-collapsible`}>
				<TableCell style={{ padding: 0, borderTop: 0 }} colSpan={5}>
					<Collapse
						in={open}
						timeout='auto'
						// unmountOnExit
						// collapsedHeight={100}
					>
						<div
							style={{
								display: "flex",
								padding: 16,
								paddingTop: 0,
								// backgroundColor: "#eee",
								justifyContent: "center",
							}}
						>
							DRILL DOWN <br />
							DRILL DOWN <br />
							DRILL DOWN <br />
							DRILL DOWN <br />
							DRILL DOWN <br />
						</div>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function SeverityChip({
	severity,
	title,
}: {
	severity: string;
	title: string;
}) {
	const color = () => {
		if (severity === "Low") return getColor(0);
		else if (severity === "Medium") return getColor(0.5);
		else if (severity === "High") return getColor(1);
	};

	return (
		<Chip
			label={title}
			size='small'
			variant='outlined'
			style={{
				color: color(),
				fontWeight: 600,
				border: `2px solid ${color()}`,
			}}
		/>
	);
}

function ViolationsChip({ number }: { number: number }) {
	return (
		<Chip
			label={number}
			// size='small'
			style={{
				color: "white",
				fontWeight: 600,
				backgroundColor: number === 0 ? "#dddddd" : getColor(1),
			}}
		/>
	);
}
