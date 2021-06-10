import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
} from "@material-ui/core";
import { default as MuiDrawer } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Collapse, Icon } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { drawerItemType, useDrawerItems } from "./DrawerData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: ({ drawerWidth }: { drawerWidth?: number }) => ({
      width: drawerWidth || 300,
      flexShrink: 0,
    }),
    drawerPaper: ({ drawerWidth }: { drawerWidth?: number }) => ({
      width: drawerWidth || 300,
    }),
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    drawerContainer: {
      overflow: "auto",
      flexGrow: 1,
    },
    drawerItemIcon: {
      color: theme.palette.text.secondary,
      transition: theme.transitions.create("transform", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
    drawerItemIconRotated: {
      transform: "rotate(180deg)",
    },
    nested: {
      paddingLeft: theme.spacing(2),
    },
  })
);

export default function Drawer({
  drawerWidth,
  open,
}: {
  drawerWidth: number;
  open: boolean;
}) {
  const classes = useStyles({ drawerWidth: drawerWidth });

  const drawerItems = useDrawerItems();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader} />
      <div className={classes.drawerContainer}>
        <List>
          {drawerItems.map((item, index) => (
            <DrawerItem key={`drawer-item-${item.title}`} item={item} />
          ))}
        </List>
      </div>
      <Divider />
      <Box padding={2} display="flex" justifyContent="center">
        <Typography variant="subtitle2" color="primary">
          v0.0.6
        </Typography>
      </Box>
    </MuiDrawer>
  );
}

function DrawerItem({
  item,
  useDivider = true,
}: {
  item: drawerItemType;
  useDivider?: boolean;
}) {
  const classes = useStyles({});
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(
    item.isNested &&
      recursivelySearchDrawerListItem(item, (i) => {
        return i.link !== undefined && location.pathname.includes(i.link);
      })
  );

  const goToLink = () => {
    history.push(item.link || "");
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    if (item.isNested) toggleOpen();
    if (item.link) goToLink();
  };

  const selected =
    (item.isNested &&
      recursivelySearchDrawerListItem(item, (i) => {
        return i.link !== undefined && location.pathname.includes(i.link);
      })) ||
    (item.link !== undefined && location.pathname.includes(item.link));

  return (
    <div>
      <ListItem button onClick={handleClick} selected={selected}>
        <ListItemIcon>
          <Icon
          // style={{ color: selected ? "white" : undefined }}
          >
            {item.icon !== "tune" && item.icon}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {item.isNested && item.nestedListItems && (
          <ExpandMore
            className={`${classes.drawerItemIcon} ${
              open && classes.drawerItemIconRotated
            }`}
            // style={{ color: selected ? "white" : undefined }}
          />
        )}
        {item.icon === "tune" && (
          <Icon
            className={classes.drawerItemIcon}
            // style={{ color: selected ? "white" : undefined }}
          >
            {item.icon}
          </Icon>
        )}
      </ListItem>

      {item.isNested && item.nestedListItems && (
        <Collapse className={classes.nested} in={open} timeout="auto">
          <List component="div" disablePadding>
            {item.nestedListItems.map((nestedItem) => (
              <DrawerItem
                key={`drawer-item-${nestedItem.title}`}
                item={nestedItem}
                useDivider={false}
              />
            ))}
          </List>
        </Collapse>
      )}

      {useDivider && <Divider />}
    </div>
  );
}

function recursivelySearchDrawerListItem(
  item: drawerItemType,
  predicate: (item: drawerItemType) => boolean
) {
  for (const i of item.nestedListItems || []) {
    if (predicate(i)) return true;
    recursivelySearchDrawerListItem(i, predicate);
  }
  return false;
}
