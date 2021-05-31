import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      width: "100%",
    },
    dashboardSummary: {
      display: "flex",
      minHeight: "50px",
      padding: theme.spacing(2),
    },
  })
);

export default function DashboardHeader({ title }: { title: string }) {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Grid item xs>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item xs>
        <ButtonGroup>
          <Button>one</Button>
          <Button>one</Button>
          <Button>one</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
