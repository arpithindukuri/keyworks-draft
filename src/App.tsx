import { useState } from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AppProvider from "./context/AppContext";
import Layout from "./components/Layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { routes } from "./Router";

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

const defaultTheme = createMyTheme({
	shape: { borderRadius: 4 },
});

const theme = createMyTheme({
	gradients: {
		green: "radial-gradient(circle at 50% -20.71%, #cbebb7 0, #bfe7b5 12.5%, #afe0af 25%, #9ad6a7 37.5%, #81ca9d 50%, #66be94 62.5%, #4bb48f 75%, #2dad8e 87.5%, #00a991 100%)",
		orange: "radial-gradient(circle at 50% -20.71%, #ffffcc 0, #e2cf7a 50%, #a69328 100%)",
		red: "radial-gradient(circle at 50% -20.71%, #f5985e 0, #f18958 16.67%, #e8764f 33.33%, #db5d43 50%, #cd423a 66.67%, #c32836 83.33%, #bb0136 100%)",
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
				marginTop: defaultTheme.spacing(0.5),
				marginBottom: defaultTheme.spacing(0.5),
				// "&:last-child": {
				// 	marginBottom: 0,
				// },
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
		MuiListItemText: {
			root: {
				marginLeft: defaultTheme.spacing(1),
			},
		},
		MuiCardContent: {
			root: {
				"&:last-child": {
					paddingBottom:
						defaultTheme.props?.MuiCardContent?.style?.padding,
				},
			},
		},
		MuiButton: {
			root: {
				// borderRadius: 5,
			},
		},
		MuiChip: {
			label: {
				fontWeight: 500,
			},
		},
	},
	typography: {
		fontFamily: ["Poppins"].join(","),
		fontSize: 12,
	},
	shape: {
		borderRadius: defaultTheme.shape.borderRadius,
	},
	palette: {
		primary: {
			light: "#6f74dd",
			main: "#3949ab",
			dark: "#00227b",
			contrastText: "#ffffff",
		},
	},
});

const useStyles = makeStyles((theme) => ({
	container: {
		// maxWidth: "100%",
		// maxHeight: "100%",
		overflow: "visible",
		// backgroundColor: theme.palette.grey[100],
	},
	appBody: ({ isDrawerOpen }: { isDrawerOpen: boolean }) => ({
		position: "relative",
		transition: "0.3s",
		// marginLeft: isDrawerOpen ? "240px" : "54px",
		// height: "100%",
		// overflowX: "visible",
		// overflowY: "scroll",
		boxSizing: "border-box",
	}),
}));

function App() {
	const [isDrawerOpen] = useState(false);

	const classes = useStyles({ isDrawerOpen });

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<AppProvider>
					<div className={classes.container}>
						<Layout>
							<div className={classes.appBody}>
								<Switch>
									{routes.map((route) => {
										return (
											<Route
												key={`${route.path}`}
												path={route.path}
												component={route.component}
											/>
										);
									})}
								</Switch>
							</div>
						</Layout>
					</div>
				</AppProvider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
