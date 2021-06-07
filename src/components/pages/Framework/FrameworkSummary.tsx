import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { CheckCircle, Notifications, ReportProblem } from "@material-ui/icons";

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
  numControls,
  numControlsCompliant,
  numAlerts,
  numViolations,
}: {
  title: string;
  subtitle?: string;
  percent: number;
  numControls?: number;
  numControlsCompliant?: number;
  numAlerts?: number;
  numViolations?: number;
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
        <Grid item xs={5} container spacing={2}>
          {numAlerts !== undefined && (
            <Grid item container direction="row">
              <Grid item xs={3}>
                <Notifications />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {numAlerts} alert
                  {numAlerts > 1 ? "s" : ""}
                </Typography>
              </Grid>
            </Grid>
          )}
          {numControls !== undefined && numControlsCompliant !== undefined && (
            <Grid item container direction="row">
              <Grid item xs={3}>
                <CheckCircle />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {numControlsCompliant} of&nbsp;
                  {numControls} controls compliant
                </Typography>
              </Grid>
            </Grid>
          )}
          {numViolations !== undefined && (
            <Grid item container direction="row">
              <Grid item xs={3}>
                <ReportProblem />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" align="left">
                  {numViolations} violation
                  {numViolations > 1 ? "s" : ""} found
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
