import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import FrameworkSummary from "../Framework/FrameworkSummary";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // display: "flex",
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    heading: {
      color: theme.palette.text.secondary,
      fontWeight: 600,
    },
    paper: {
      padding: theme.spacing(2),
      minHeight: "150px",
      textAlign: "center",
      alignItems: "center",
      color: theme.palette.text.secondary,
    },
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
        transform: "translateY(2rem) scale(0.95)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    fadeIn: {
      animation: "$fadeIn 0.8s ease backwards",
      animationDelay: "calc(var(--animation-order) * 300ms)",
      transformOrigin: "center",
    },
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            className={`${classes.heading} ${classes.fadeIn}`}
            style={{ "--animation-order": 0 } as CSSProperties}
            variant="h4"
          >
            Framework Summary
          </Typography>
        </Grid>
        <Grid
          className={classes.fadeIn}
          style={{ "--animation-order": 1 } as CSSProperties}
          item
          xs={3}
        >
          <Paper className={classes.paper}>
            <FrameworkSummary
              title="PCI"
              percent={0.94}
              difference={0.02}
              newAlerts={4}
              violations={45}
            />
          </Paper>
        </Grid>
        <Grid
          className={classes.fadeIn}
          style={{ "--animation-order": 2 } as CSSProperties}
          item
          xs={3}
        >
          <Paper className={classes.paper}>
            <FrameworkSummary
              title="ISO27001"
              percent={0.63}
              difference={-0.04}
              newAlerts={1}
              violations={50}
            />
          </Paper>
        </Grid>
        <Grid
          className={classes.fadeIn}
          style={{ "--animation-order": 3 } as CSSProperties}
          item
          xs={3}
        >
          <Paper className={classes.paper}>
            <FrameworkSummary
              title="NIST"
              percent={0.89}
              difference={-0.01}
              newAlerts={1}
              violations={62}
            />
          </Paper>
        </Grid>
        <Grid
          className={classes.fadeIn}
          style={{ "--animation-order": 4 } as CSSProperties}
          item
          xs={3}
        >
          <Paper className={classes.paper}>
            <FrameworkSummary
              title="Overall"
              percent={0.82}
              difference={-0.01}
              newAlerts={6}
              violations={45 + 50 + 62}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
