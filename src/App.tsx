import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Dashboard from "./components/RGL/Dashboard";

import Drawer from "./components/Drawer";

import { ThemeOptions } from "@material-ui/core/styles";
import { useState } from "react";
import AppProvider from "./context/AppContext";

declare module "@material-ui/core/styles/createMuiTheme" {
	interface Theme {
		gradients: {
			[key: string]: string;
		};
	}
	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		gradients?: {
			[key: string]: string;
		};
	}
}

function createMyTheme(options: ThemeOptions) {
	return createMuiTheme({
		gradients: {},
		...options,
	});
}

const defaultTheme = createMyTheme({});

const theme = createMyTheme({
	gradients: {
		green:
			"radial-gradient(circle at 50% -20.71%, #cbebb7 0, #bfe7b5 12.5%, #afe0af 25%, #9ad6a7 37.5%, #81ca9d 50%, #66be94 62.5%, #4bb48f 75%, #2dad8e 87.5%, #00a991 100%)",
		orange:
			"radial-gradient(circle at 50% -20.71%, #ffffcc 0, #e2cf7a 50%, #a69328 100%)",
		red:
			"radial-gradient(circle at 50% -20.71%, #f5985e 0, #f18958 16.67%, #e8764f 33.33%, #db5d43 50%, #cd423a 66.67%, #c32836 83.33%, #bb0136 100%)",
	},
	overrides: {
		MuiList: {
			padding: {
				padding: defaultTheme.spacing(1),
			},
		},
		MuiListItem: {
			root: {
				borderRadius: defaultTheme.shape.borderRadius,
				marginBottom: defaultTheme.spacing(1),
				"&:last-child": {
					marginBottom: 0,
				},
			},
			gutters: {
				paddingLeft: defaultTheme.spacing(1),
				paddingRight: defaultTheme.spacing(1),
			},
		},
		MuiListItemIcon: {
			root: {
				minWidth: 0,
			},
		},
	},
});

const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
		maxWidth: "100vw",
		overflow: "hidden",
		backgroundColor: theme.palette.background.default,
	},
}));

function App() {
	const classes = useStyles();

	const [open, setOpen] = useState(true);

	return (
		<ThemeProvider theme={theme}>
			<AppProvider>
				<div className={classes.container}>
					<Drawer open={open} setOpen={setOpen} />
					<div
						style={{
							transition: "0.3s",
							marginLeft: open ? "240px" : "54px",
							width: open
								? "calc(100vw - 256px)"
								: "calc(100vw - 70px)",
							minHeight: "100vh",
						}}
					>
						<Dashboard />
					</div>
				</div>
			</AppProvider>
		</ThemeProvider>
	);
}

export default App;
