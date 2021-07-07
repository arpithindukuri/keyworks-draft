import {
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";
import { selectDashboardById } from "../../../redux/dashboardSlice";
import { selectFrameworks } from "../../../redux/frameworkSlice";
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
  const dashboardId = location.pathname.split("/")[3];
  const dashboard = useAppSelector(selectDashboardById(dashboardId));
  const frameworks = useAppSelector(selectFrameworks);

  const classes = useStyles();

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
                {dashboard?.name}
              </Typography>
            </ListItem>
            <Divider />
            {widgetList.map((widget) =>
              widget.hidden ? null : (
                <WidgetListItem
                  key={`widget-list-item-${widget.title}`}
                  title={widget.title}
                  widgetType={widget.i}
                />
              )
            )}
            {frameworks.map((framework) => (
              <WidgetListItem
                key={`widget-list-item-compliance-${framework.id}`}
                title={`${framework.name} Compliance`}
                widgetType={`compliance-${framework.id}`}
              />
            ))}
            {frameworks.map((framework) => (
              <WidgetListItem
                key={`widget-list-item-alerts-${framework.id}`}
                title={`${framework.name} Alerts`}
                widgetType={`alerts-${framework.id}`}
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
  disabled = true,
}: {
  title: string;
  widgetType: WidgetIdType;
  disabled?: boolean;
}) {
  const { setType, clearType } = useContext(AppContext);

  return (
    <div
      draggable={disabled}
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
          primaryTypographyProps={{
            color: disabled ? undefined : "textSecondary",
          }}
        />
      </ListItem>
    </div>
  );
}
