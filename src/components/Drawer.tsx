import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { default as MuiDrawer } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Collapse, Icon } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { selectDashboards } from "../redux/dashboardSlice";

type drawerListItemType = {
	title: string;
	link?: string;
	icon?: string;
	isNested?: boolean;
	nestedListItems?: drawerListItemType[];
};

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
			variant='persistent'
			anchor='left'
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.drawerHeader} />
			<div className={classes.drawerContainer}>
				<List>
					{drawerItems.map((item, index) => (
						<DrawerItem
							key={`drawer-item-${item.title}`}
							item={item}
						/>
					))}
				</List>
			</div>
		</MuiDrawer>
	);
}

function DrawerItem({
	item,
	useDivider = true,
}: {
	item: drawerListItemType;
	useDivider?: boolean;
}) {
	const classes = useStyles({});
	const history = useHistory();
	const location = useLocation();

	const [open, setOpen] = React.useState(
		item.isNested &&
			recursivelySearchDrawerListItem(item, (i) => {
				return (
					i.link !== undefined && location.pathname.includes(i.link)
				);
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
				return (
					i.link !== undefined && location.pathname.includes(i.link)
				);
			})) ||
		(item.link !== undefined && location.pathname.includes(item.link));

	return (
		<div>
			<ListItem button onClick={handleClick} selected={selected}>
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
				<Collapse className={classes.nested} in={open} timeout='auto'>
					<List component='div' disablePadding>
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
	item: drawerListItemType,
	predicate: (item: drawerListItemType) => boolean
) {
	for (const i of item.nestedListItems || []) {
		if (predicate(i)) return true;
		recursivelySearchDrawerListItem(i, predicate);
	}
	return false;
}

function useDrawerItems(): drawerListItemType[] {
	return [
		{
			title: "Home",
			link: "/home",
			icon: "home",
			isNested: false,
		},
		useDashboardItems(),
		{
			title: "Frameworks",
			icon: "device_hub",
			isNested: true,
			nestedListItems: [
				{ title: "Overview", link: "/framework/overview" },
				{ title: "PCI" },
				{ title: "ISO27001" },
				{ title: "NIST" },
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
				{ title: "Overview" },
				{ title: "STIX" },
				{ title: "TAXII" },
				{ title: "Manage Threat Feeds", icon: "tune" },
			],
		},
		{
			title: "AI/ML",
			icon: "memory",
			isNested: true,
			nestedListItems: [
				{ title: "Overview" },
				{ title: "AI Feeds" },
				{ title: "ML Feeds" },
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
				{ title: "Global" },
				{ title: "Calgary International Airport" },
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
				{ title: "My API" },
				{ title: "API2" },
				{ title: "HVAC Sensors" },
				{
					title: "Manage APIs",
					icon: "tune",
				},
			],
		},
	];
}

function useDashboardItems() {
	const dashboards = useAppSelector(selectDashboards);

	const nestedListItems = dashboards.map((dash) => ({
		title: dash.name,
		link: `/dashboard/${dash.id}`,
	}));

	return {
		title: "Dashboards",
		icon: "dashboard",
		isNested: true,
		nestedListItems: [
			...nestedListItems,
			{
				title: "Manage Dashboards",
				link: "/dashboard/manage",
				icon: "tune",
			},
		],
	};
}
