import { Button, createStyles, Grid, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { format, parse } from "date-fns";
import { Alert as AlertType } from "../../../redux/frameworkSlice";

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
      // width: "100%",
    },
  })
);

export default function AlertList({ alerts }: { alerts: AlertType[] }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={1}>
      {alerts.map((item) => (
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
                "hh:mm bbb, eee LLLL Mo"
              )}
            </i>
          </Alert>
        </Grid>
      ))}
    </Grid>
  );
}
