import { useAppSelector } from "../../redux/hooks";
import { selectDashboards } from "../../redux/dashboardSlice";
import { selectFrameworks } from "../../redux/frameworkSlice";
import { selectThreatFeeds } from "../../redux/threatFeedSlice";

export type drawerItemType = {
  title: string;
  link?: string;
  icon?: string;
  isNested?: boolean;
  nestedListItems?: drawerItemType[];
};

export function useDrawerItems(): drawerItemType[] {
  return [
    useDashboardItems(),
    useFrameworkItems(),
    useThreatFeedItems(),
    {
      title: "APIs",
      icon: "power",
      isNested: true,
      nestedListItems: [
        { title: "External", link: "/api/external" },
        { title: "Internal", link: "/api/internal" },
      ],
    },
    {
      title: "Admin",
      icon: "supervisor_account",
      isNested: true,
      nestedListItems: [
        useTuneItem("Manage Users", "/admin/users"),
        useTuneItem("Manage Frameworks", "/admin/framework"),
        useTuneItem("Manage Corporate GIS", "/admin/corporateGIS"),
        useTuneItem("Manage Global GIS", "/admin/globalGIS"),
        useTuneItem("Manage Threat Feeds", "/admin/threatfeed"),
        useTuneItem("Manage External APIs", "/admin/api"),
        useTuneItem("Manage Internal APIs", "/admin/internal-api"),
      ],
    },
  ];
}

export function useDashboardItems() {
  const dashboards = useAppSelector(selectDashboards);

  const nestedListItems = dashboards.map((dash) => {
    const link =
      dash.id === "compliance-dashboard"
        ? "/framework/overview"
        : `/dashboard/${dash.id}`;
    return {
      title: dash.name,
      link,
    };
  });

  return {
    title: "Dashboards",
    icon: "dashboard",
    isNested: true,
    nestedListItems: [...nestedListItems],
  };
}

// OVERDUE
export function useFrameworkItems() {
  const frameworks = useAppSelector(selectFrameworks);

  const nestedListItems = frameworks.map((frame) => ({
    title: frame.name,
    link: `/framework/${frame.id}`,
  }));

  return {
    title: "Framework Overviews",
    icon: "device_hub",
    isNested: true,
    nestedListItems: [...nestedListItems],
  };
}

export function useThreatFeedItems() {
  const threatFeeds = useAppSelector(selectThreatFeeds);

  const num = Math.min(threatFeeds.length, 5);
  const nestedListItems: drawerItemType[] = [];

  for (let i = 0; i < num; i++) {
    const element = threatFeeds[i];
    nestedListItems.push({
      title: `${element.name} (${element.isActive ? "Active" : "Inactive"})`,
    });
  }

  return {
    title: "Threat Intelligence Feeds",
    icon: "wifi_tethering_error_rounded",
    isNested: true,
    nestedListItems: [...nestedListItems],
  };
}

function useTuneItem(title: string, link: string) {
  return {
    title,
    link,
    icon: "tune",
  };
}
