import { makeStyles, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AppProvider from "./context/AppContext";
import Layout from "./components/layout/Layout";
import { routes } from "./Router";
import getTheme, { defaultBorderRadius } from "./Theme";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const theme = getTheme("light");

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".react-grid-item.react-grid-placeholder": {
      backgroundColor: "unset",
      opacity: "unset",
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.primary.light}`,
    },
    ".react-resizable-handle::after": {
      width: `${defaultBorderRadius}px !important`,
      height: `${defaultBorderRadius}px !important`,
      borderRadius: `0 0 ${defaultBorderRadius / 1.5}px 0`,
      borderRight: "4px solid rgba(0, 0, 0, 0.4) !important",
      borderBottom: "4px solid rgba(0, 0, 0, 0.4) !important",
    },
  },
  container: {
    overflow: "visible",
  },
  appBody: () => ({
    position: "relative",
    transition: "0.3s",
    boxSizing: "border-box",
  }),
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
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
          </SnackbarProvider>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
