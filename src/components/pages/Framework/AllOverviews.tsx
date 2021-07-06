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

export default function AllOverviews() {
  const classes = useStyles();

  const frameworks = useAppSelector(selectFrameworks);

  return (
    <div className={classes.container}>
      {frameworks.length > 0 ? (
        <Grid container xs spacing={3}>
          {frameworks.map((framework) => {
            const controls =
              framework?.controls.filter((item) => item.isActive) || [];

            const numActive = countActiveControls(controls);
            const numCompliant = countCompliantControls(controls);

            return (
              <Grid item container xs={12}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={4}>
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
                      </Grid>
                      <Grid item xs={8}>
                        <Box padding={2} maxHeight="60vh" overflow="auto">
                          <AlertList framework={framework} />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>No Frameworks</Typography>
      )}
    </div>
  );
}
