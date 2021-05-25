import { makeStyles } from "@material-ui/core";
import { Color } from "@material-ui/lab";
import { createStyles } from "@material-ui/styles";
import FrameworkOverview from "./FrameworkOverview";
import { ISOAlerts, ISOControls } from "./ISOData";
import { NISTAlerts, NISTControls } from "./NISTData";
import { PCIAlerts, PCIControls } from "./PCIData";

export type alertType = {
	title: string;
	text: JSX.Element;
	severity: Color;
};

export function createAlert(
	title: string,
	text: JSX.Element,
	severity: Color
): alertType {
	return { title, text, severity };
}

export type controlType = {
	control: string;
	description: string;
	severity: string;
	violations: number;
	needsReview: boolean;
};

export function createControl(
	control: string,
	description: string,
	severity: string,
	violations: number,
	needsReview: boolean
): controlType {
	return { control, description, severity, violations, needsReview };
}

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			display: "flex",
			flexDirection: "column",
			padding: theme.spacing(3),
		},
	})
);

export default function AllOverviews() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<FrameworkOverview
				title='PCI'
				percent={0.78}
				alerts={PCIAlerts}
				controls={PCIControls}
			/>
			<FrameworkOverview
				title='ISO27001'
				percent={0.56}
				alerts={ISOAlerts}
				controls={ISOControls}
			/>
			<FrameworkOverview
				title='NIST'
				percent={0.9}
				alerts={NISTAlerts}
				controls={NISTControls}
			/>
		</div>
	);
}
