import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Collapse,
	createStyles,
	Divider,
	Grid,
	GridSize,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import { Framework as FrameworkType } from "../../../redux/frameworkSlice";
import AlertList from "./AlertList";
import ControlList from "./ControlList";

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			padding: theme.spacing(1.5),
			margin: 0,
			width: "100%",
		},
		frameworkSummary: {
			display: "flex",
			minHeight: "50px",
			padding: theme.spacing(2),
		},
	})
);

export default function Framework({ framework }: { framework: FrameworkType }) {
	const classes = useStyles();

	return (
		<Grid className={classes.container} container spacing={3}>
			<Grid item xs={12} md={12}>
				<Card>
					<CardHeader
						title={framework.name}
						titleTypographyProps={{ variant: "h4" }}
						action={
							<IconButton>
								<MoreVert />
							</IconButton>
						}
					/>
					<CardContent>
						<Grid container direction='column' spacing={4}>
							<FrameworkItem title='ALERTS'>
								<AlertList alerts={framework.alerts} />
							</FrameworkItem>
							<Divider variant='middle' />
							<FrameworkItem title='CONTROLS'>
								<ControlList controls={framework.controls} />
							</FrameworkItem>
							<Divider variant='middle' />
							<FrameworkItem title='INPUTS'>inputs</FrameworkItem>
							<Divider variant='middle' />
							<FrameworkItem title='DOCUMENTS'>
								docs
							</FrameworkItem>
							<Divider variant='middle' />
							<FrameworkItem title='PROCESSES'>
								procs
							</FrameworkItem>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

function FrameworkItem({
	title,
	action,
	children,
	xs,
}: {
	title: string;
	action?: JSX.Element;
	children: any;
	xs?: GridSize;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Grid item xs={xs || true} container spacing={4}>
			<Grid item xs={2}>
				<Typography color='textSecondary' variant='body1' align='right'>
					{title}
				</Typography>
			</Grid>
			<Grid item xs container alignContent='center'>
				<Grid container direction='column' spacing={1}>
					<Grid item>{action}</Grid>
					<Grid item>
						<Collapse in={open} collapsedHeight={100}>
							{children}
						</Collapse>
					</Grid>
					<Grid item>
						<Button
							fullWidth
							onClick={() => setOpen((prev) => !prev)}
						>
							Show More
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
