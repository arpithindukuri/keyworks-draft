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
