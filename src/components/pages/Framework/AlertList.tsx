import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { format, parse } from "date-fns";
import { Framework, getControlById } from "../../../redux/frameworkSlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100%",
      // height: "100%",
      // maxHeight: "80vh",
      // overflow: "auto",
      // boxSizing: "content-box",
    },
    alert: {
      width: "100%",
    },
  })
);

export default function AlertList({ framework }: { framework: Framework }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item>
        <Typography variant="h4">{framework.name}</Typography>
      </Grid>
      {framework.alerts.map((item) => {
        const id =
          item.title.split(" ").length > 1 ? item.title.split(" ")[1] : "";
        const control = getControlById(framework.controls, id);
        if (control && control.isActive)
          return (
            <Grid item xs={12}>
              <Alert
                className={classes.alert}
                severity={item.severity}
                action={
                  <Button color="inherit" size="small">
                    DISMISS
                  </Button>
                }
              >
                <AlertTitle>{item.title}</AlertTitle>
                {item.child}
                <br />
                <i>
                  {format(
                    parse(item.timestamp, "T", new Date()),
                    "hh:mm bbb, eee LLLL Mo, y"
                  )}
                </i>
              </Alert>
            </Grid>
          );
      })}
    </Grid>
  );
}
