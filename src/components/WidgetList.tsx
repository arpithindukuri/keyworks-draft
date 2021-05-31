import { Dispatch, useContext } from "react";
import {
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SvgIconTypeMap,
} from "@material-ui/core";
import classNames from "classnames";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { AppContext } from "../context/AppContext";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { WidgetIdType } from "../redux/widgetSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      whiteSpace: "nowrap",
      display: "flex",
    },
    drawerOpen: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: drawerWidth,
      overflow: "hidden",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflow: "hidden",
      width: theme.spacing(7),
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    drawerControl: {
      padding: theme.spacing(1),
      transition: "transform 0.3s",
      color: theme.palette.primary.contrastText,
    },
    flipped180: {
      transform: "rotate(180deg)",
    },
    listItemText: {
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.contrastText,
    },
    listItemIcon: {
      color: theme.palette.primary.contrastText,
    },
    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        cursor: "grab",
      },
      "&:active": {
        cursor: "grabbing",
        backgroundColor: theme.palette.primary.light,
      },
      transition: "0.08s",
    },
    drawerPaper: {
      position: "absolute",
      height: "100vh",
      // height: "calc(100vh - 16px)",
      // top: "8px",
      // left: "8px",
      // borderRadius: "0 12px 12px 0",
      border: 0,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const views: {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  dragType: WidgetIdType;
}[] = [
  {
    title: "Ratings",
    icon: StarHalfIcon,
    dragType: "ratings",
  },
  {
    title: "Rating Trends",
    icon: TrendingUpIcon,
    dragType: "trends",
  },
  {
    title: "Regulatory Compliance",
    icon: PlaylistAddCheckIcon,
    dragType: "regcomp",
  },
  {
    title: "High Risk Assets",
    icon: AccountBalanceWalletIcon,
    dragType: "highriskassets",
  },
];

export default function ChatList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      PaperProps={{
        className: classes.drawerPaper,
        elevation: 3,
      }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("drawer-container"),
        style: { position: "absolute" },
      }}
    >
      <div className={classes.toolbar}>
        <IconButton
          onClick={toggleDrawer}
          className={classNames({
            [classes.drawerControl]: true,
            [classes.flipped180]: open,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <List>
        {views.map((view) => (
          <Item
            key={`drawer-item-${view.title}`}
            title={view.title}
            icon={<view.icon />}
            dragType={view.dragType}
          />
        ))}
      </List>
    </Drawer>
  );
}

function Item({
  title,
  icon,
  dragType,
}: {
  title: string;
  icon: JSX.Element;
  dragType: WidgetIdType;
}) {
  const classes = useStyles();
  // const theme -
  const { setType, clearType } = useContext(AppContext);

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", "");
        setType(dragType);
      }}
      onDragEnd={() => {
        clearType();
      }}
    >
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={title}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </div>
  );
}
