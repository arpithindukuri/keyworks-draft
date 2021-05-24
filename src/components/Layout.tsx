import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import logoIpsum from "../assets/logo-12.svg";
import { Collapse, Icon } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

type drawerListItemType = {
	title: string;
	icon?: string;
	isNested?: boolean;
	nestedListItems?: drawerListItemType[];
};

const drawerList: drawerListItemType[] = [
	{
		title: "Dashboard",
		icon: "dashboard",
		isNested: true,
		nestedListItems: [
			{
				title: "Risk Analysis",
			},
			{
				title: "Compliance",
			},
			{
				title: "Manage Dashboards",
				icon: "tune",
			},
		],
	},
	{
		title: "Frameworks",
		icon: "device_hub",
		isNested: true,
		nestedListItems: [
			{
				title: "PCI",
			},
			{
				title: "ISO27001",
			},
			{
				title: "NIST",
			},
			{
				title: "Manage Frameworks",
				icon: "tune",
			},
		],
	},
	{
		title: "Threat Intelligence Feeds",
		icon: "wifi_tethering_error_rounded",
		isNested: true,
		nestedListItems: [
			{
				title: "STIX",
			},
			{
				title: "TAXII",
			},
			{
				title: "Manage Threat Feeds",
				icon: "tune",
			},
		],
	},
	{
		title: "AI/ML",
		icon: "memory",
		isNested: true,
		nestedListItems: [
			{
				title: "AI Feeds",
			},
			{
				title: "ML Feeds",
			},
			{
				title: "Manage AI/ML Feeds",
				icon: "tune",
			},
		],
	},
	{
		title: "GIS",
		icon: "place",
		isNested: true,
		nestedListItems: [
			{
				title: "Global",
			},
			{
				title: "Calgary International Airport",
			},
			{
				title: "Manage GIS",
				icon: "tune",
			},
		],
	},
	{
		title: "APIs",
		icon: "power",
		isNested: true,
		nestedListItems: [
			{
				title: "My API",
			},
			{
				title: "API2",
			},
			{
				title: "Manage APIs",
				icon: "tune",
			},
		],
	},
];

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
			marginRight: theme.spacing(2),
		},
		logoIpsum: {
			display: "flex",
			height: "56px",
			padding: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			textAlign: "center",
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: "flex-end",
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
		nested: {
			paddingLeft: theme.spacing(2),
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
	})
);

export default function Layout({ children }: { children: any }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleDrawerToggle = () => {
		setOpen((prev) => !prev);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: false,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}
						edge='start'
						className={clsx(classes.menuButton)}
					>
						<MenuIcon />
					</IconButton>
					<img
						className={classes.logoIpsum}
						src={logoIpsum}
						alt='Placeholder Logo'
					/>
					<Typography className={classes.title} variant='h6' noWrap>
						11:40 am (MT)
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader} />
				<Divider />
				<List>
					{drawerList.map((item, index) => (
						<DrawerItem item={item} />
					))}
				</List>
			</Drawer>
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

function DrawerItem({
	item,
	useDivider = true,
}: {
	item: drawerListItemType;
	useDivider?: boolean;
}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem
				key={`drawer-item-${item.title}`}
				button
				onClick={item.isNested ? toggleOpen : undefined}
			>
				<ListItemIcon>
					<Icon>{item.icon !== "tune" && item.icon}</Icon>
				</ListItemIcon>
				<ListItemText primary={item.title} />
				{item.isNested && item.nestedListItems && (
					<ExpandMore
						className={`${classes.drawerItemIcon} ${
							open && classes.drawerItemIconRotated
						}`}
					/>
				)}
				{item.icon === "tune" && (
					<Icon className={classes.drawerItemIcon}>{item.icon}</Icon>
				)}
			</ListItem>

			{item.isNested && item.nestedListItems && (
				<Collapse
					className={classes.nested}
					in={open}
					timeout='auto'
					unmountOnExit
				>
					<List component='div' disablePadding>
						{item.nestedListItems.map((nestedItem) => (
							<DrawerItem item={nestedItem} useDivider={false} />
						))}
					</List>
				</Collapse>
			)}

			{useDivider && <Divider />}
		</>
	);
}
