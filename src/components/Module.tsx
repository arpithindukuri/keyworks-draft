import { Card, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		// borderRadius: 0,
	},
	header: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(1),
	},
	title: {
		cursor: "grab",
		fontWeight: 600,
		color: theme.palette.text.secondary,
		transition: "0.3s",
		"&:hover": {
			color: theme.palette.text.primary,
		},
	},
	body: {
		// display: "flex",
		// flexGrow: 1,
		width: "100%",
		height: `calc(100% - ${
			theme.typography.h6.lineHeight
		}rem - ${theme.spacing(5)}px)`,
	},
}));

export default function Module({
	title,
	children,
}: {
	title: string;
	children?: any;
}) {
	const classes = useStyles();

	return (
		<Card
			className={classes.container}
			elevation={3}
			// variant='outlined'
		>
			<div className={classes.header}>
				<Typography
					className={`${classes.title} ModuleDragHandle`}
					variant='h6'
				>
					{title}
				</Typography>
			</div>
			<div className={classes.body}>{children}</div>
		</Card>
	);
}
