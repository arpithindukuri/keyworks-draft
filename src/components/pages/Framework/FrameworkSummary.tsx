import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import {
  ArrowDropDown,
  ArrowDropUp,
  Notifications,
  ReportProblem,
} from "@material-ui/icons";

import PieChartRating from "../../widgets/PieChartRating";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    body: {
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
    },
    pieContainer: {
      // flexGrow: 1,
    },
  })
);

export default function FrameworkSummary({
  title,
  subtitle = "compliance",
  percent,
  difference,
  newAlerts,
  violations,
}: {
  title: string;
  subtitle?: string;
  percent: number;
  difference?: number;
  newAlerts?: number;
  violations?: number;
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column">
      <Grid item>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">{subtitle}</Typography>
      </Grid>
      <Grid container className={classes.body} alignItems="center">
        <Grid item className={classes.pieContainer} xs={7}>
          <PieChartRating percent={percent} inverse />
        </Grid>
        <Grid item xs={5}>
          {difference && (
            <Grid container direction="row">
              <Grid item xs={3}>
                {difference >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {Math.round(difference * 100)}%
                </Typography>
              </Grid>
            </Grid>
          )}
          {newAlerts && (
            <Grid container direction="row">
              <Grid item xs={3}>
                <Notifications />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {newAlerts} new alert
                  {newAlerts > 1 ? "s" : ""}
                </Typography>
              </Grid>
            </Grid>
          )}
          {violations && (
            <Grid container direction="row">
              <Grid item xs={3}>
                <ReportProblem />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {violations} violation
                  {violations > 1 ? "s" : ""} found
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
