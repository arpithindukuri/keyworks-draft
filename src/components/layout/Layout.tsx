import { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../assets/BluesPoint on navy - long.png";
import { Badge, Button, Menu, MenuItem } from "@material-ui/core";
import {
  AccountCircle,
  ArrowDropDown,
  Notifications,
} from "@material-ui/icons";
import Drawer from "./Drawer";
import { useLocation } from "react-router";
import DashboardActions, {
  DashboardEditActions,
} from "../pages/Dashboard/DashboardActions";
import FrameworkActions, {
  FrameworkEditActions,
} from "../pages/Framework/FrameworkActions";
import { format } from "date-fns";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      // marginRight: theme.spacing(1),
    },
    logo: {
      display: "flex",
      height: "56px",
      margin: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    search: {
      position: "relative",
      borderRadius: "50px",
      backgroundColor: fade(theme.palette.common.black, 0.05),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.1),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      position: "relative",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    badge: {
      backgroundColor: theme.palette.info.main,
      background: theme.gradients.info,
      color: "white",
    },
  })
);

export default function Layout({ children }: { children: any }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: false,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <img className={classes.logo} src={logo} alt="Placeholder Logo" />
          <Typography className={classes.title} variant="h6" noWrap>
            {format(new Date(), "hh:mm bbb, eee LLLL Mo (OOO)")}
          </Typography>
          <PageActions />
          <IconButton color="inherit" style={{ marginLeft: 16 }}>
            <Badge
              badgeContent={6}
              color="primary"
              // classes={{ badge: classes.badge }}
            >
              <Notifications />
            </Badge>
          </IconButton>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClick}
            startIcon={<AccountCircle />}
            endIcon={<ArrowDropDown />}
            style={{ borderRadius: 20, marginLeft: 16 }}
            size="large"
          >
            Admin
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer drawerWidth={drawerWidth} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

function PageActions() {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes("/dashboard/edit")) return <DashboardEditActions />;
  if (path.includes("/dashboard/home")) return <DashboardActions />;
  if (path.includes("/admin/framework/manage")) return <FrameworkEditActions />;
  if (path.includes("/admin/framework")) return <></>;
  if (path.includes("/framework")) return <FrameworkActions />;

  return <></>;
}
