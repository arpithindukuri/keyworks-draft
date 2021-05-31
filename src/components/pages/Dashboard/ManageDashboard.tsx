import {
  Button,
  ButtonGroup,
  Checkbox,
  createStyles,
  Divider,
  Grid,
  GridSize,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Edit, Lock, LockOpen, MoreVert } from "@material-ui/icons";
import { useHistory } from "react-router";
import {
  Dashboard,
  selectDashboards,
  update,
} from "../../../redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

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

export default function ManageDashboard() {
  const classes = useStyles();

  const dashboards = useAppSelector(selectDashboards);

  return (
    <Grid className={classes.container} container spacing={2}>
      {dashboards.map((dash) => (
        <DashboardSummary
          key={`dashboard-summary-${dash.id}`}
          dashboard={dash}
        />
      ))}
    </Grid>
  );
}

function DashboardSummary({ dashboard }: { dashboard: Dashboard }) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <Grid item xs={12}>
      <Paper className={classes.dashboardSummary}>
        <Grid container direction="row" spacing={2}>
          <DashboardSummaryItem title="ACTIVE">
            <Checkbox
              checked={dashboard.isActive}
              color="primary"
              onChange={(e) => {
                dispatch(
                  update({
                    id: dashboard.id,
                    newDashboard: {
                      ...dashboard,
                      isActive: e.target.checked,
                    },
                  })
                );
              }}
            />
          </DashboardSummaryItem>
          <DashboardSummaryItem title="NAME">
            <Typography>{dashboard.name}</Typography>
          </DashboardSummaryItem>
          <DashboardSummaryItem title="OWNER">
            <Typography>{dashboard.owner}</Typography>
          </DashboardSummaryItem>
          <DashboardSummaryItem title="ACCESS">
            {dashboard.hasAccess ? (
              <LockOpen color="disabled" />
            ) : (
              <Lock color="disabled" />
            )}
          </DashboardSummaryItem>
        </Grid>
        <Divider flexItem orientation="vertical" variant="middle" />
        <DashboardSummaryItem title="ACTIONS">
          <ButtonGroup
            variant="outlined"
            color="primary"
            disableElevation
            size="small"
          >
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() =>
                history.push(`/dashboard/manage/edit/${dashboard.id}`)
              }
            >
              Edit
            </Button>
            <Button>View</Button>
            <Button>Share</Button>
            <Button>
              <MoreVert />
            </Button>
          </ButtonGroup>
        </DashboardSummaryItem>
      </Paper>
    </Grid>
  );
}

function DashboardSummaryItem({
  title,
  children,
  xs,
}: {
  title: string;
  children: any;
  xs?: GridSize;
}) {
  return (
    <Grid
      item
      xs={xs || true}
      container
      direction="column"
      // alignItems='center'
    >
      <Grid item>
        <Typography color="textSecondary" variant="subtitle2">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container alignContent="center">
        {children}
      </Grid>
    </Grid>
  );
}
