import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Color } from "@material-ui/lab";
import { createStyles } from "@material-ui/styles";
import {
  countActiveControls,
  countCompliantControls,
  selectFrameworks,
} from "../../../redux/frameworkSlice";
import { useAppSelector } from "../../../redux/hooks";
import HighRiskAssets from "../../widgets/HighRiskAssets";
import Ratings from "../../widgets/Ratings";
import RatingTrends from "../../widgets/RatingTrends";
import RegulatoryCompliance from "../../widgets/RegulatoryCompliance";
import AlertList from "./AlertList";
import FrameworkSummary from "./FrameworkSummary";

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
      // display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
    },
  })
);

export default function OrganizationalOverview() {
  const classes = useStyles();

  const frameworks = useAppSelector(selectFrameworks);

  return (
    <div className={classes.container}>
      {frameworks.length > 0 ? (
        <Grid container xs spacing={3}>
          <Grid item xs={6}>
            <Ratings />
          </Grid>
          <Grid item xs={6}>
            <RatingTrends />
          </Grid>
          <Grid item container xs={12} spacing={3}>
            {frameworks.map((framework) => {
              const controls =
                framework?.controls.filter((item) => item.isActive) || [];

              const numActive = countActiveControls(controls);
              const numCompliant = countCompliantControls(controls);

              return (
                <Grid item container xs={4}>
                  <Card>
                    <CardContent>
                      <FrameworkSummary
                        title={framework.name}
                        subtitle=""
                        percent={numCompliant / numActive}
                        numControls={numActive}
                        numControlsCompliant={numCompliant}
                        numAlerts={framework.alerts.length}
                        numViolations={numActive - numCompliant}
                        link={`/framework/${framework.id}`}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={4}>
            <RegulatoryCompliance />
          </Grid>
          <Grid item xs={8}>
            <HighRiskAssets />
          </Grid>
        </Grid>
      ) : (
        <Typography>No Frameworks</Typography>
      )}
    </div>
  );
}
