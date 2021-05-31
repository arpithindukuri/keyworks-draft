import {
  Button,
  ButtonGroup,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { useSnackbar } from "notistack";
import { AppContext } from "../../../context/AppContext";
import { selectDashboardById } from "../../../redux/dashboardSlice";
import { useAppSelector } from "../../../redux/hooks";
import { WidgetIdType, widgetList } from "../../../redux/widgetSlice";
import Dashboard from "./Dashboard";

const drawerWidth = 300;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      position: "absolute",
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      position: "relative",
    },
  })
);

export default function EditDashboard() {
  const location = useLocation();
  const dashboardId = location.pathname.split("/")[4];
  const dashboard = useAppSelector(selectDashboardById(dashboardId));
  const history = useHistory();

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  if (dashboard === undefined)
    return <Typography variant="h4">404: No such dashboard found</Typography>;

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <Typography variant="h5">Editing Dashboard:</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h6" color="textSecondary">
                {dashboard?.name} - Owned By {dashboard?.owner}
              </Typography>
            </ListItem>
            <ListItem>
              <ButtonGroup fullWidth color="primary" disableElevation>
                <Tooltip title="Does not work LOL">
                  <Button startIcon={<Cancel />}>Cancel</Button>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={() => {
                    enqueueSnackbar("Layout Saved");
                    history.push(`/dashboard/manage`);
                  }}
                >
                  Save
                </Button>
              </ButtonGroup>
            </ListItem>
            <Divider />
            {widgetList.map((widget) => (
              <WidgetListItem
                key={`widget-list-item-${widget.title}`}
                title={widget.title}
                widgetType={widget.i}
              />
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Dashboard dashboard={dashboard} canEdit />
      </main>
    </div>
  );
}

function WidgetListItem({
  title,
  widgetType,
}: {
  title: string;
  widgetType: WidgetIdType;
}) {
  const { setType, clearType } = useContext(AppContext);

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", "");
        setType(widgetType);
      }}
      onDragEnd={() => {
        clearType();
      }}
    >
      <ListItem button disableRipple disableTouchRipple>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </div>
  );
}
