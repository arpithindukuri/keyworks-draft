import { useAppSelector } from "../../redux/hooks";
import { selectDashboards } from "../../redux/dashboardSlice";
import { selectFrameworks } from "../../redux/frameworkSlice";

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
    {
      title: "Threat Intelligence Feeds",
      icon: "wifi_tethering_error_rounded",
      isNested: true,
      nestedListItems: [{ title: "Overview" }, { title: "STIX/TAXII" }],
    },
    {
      title: "AI/ML",
      icon: "memory",
      isNested: true,
      nestedListItems: [
        { title: "Overview" },
        { title: "AI Feeds" },
        { title: "ML Feeds" },
      ],
    },
    {
      title: "GIS",
      icon: "place",
      isNested: true,
      nestedListItems: [
        { title: "Global" },
        { title: "Calgary International Airport" },
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
      ],
    },
    {
      title: "Admin",
      isNested: true,
      nestedListItems: [
        useTuneItem("Users", "/admin/users"),
        useTuneItem("Frameworks", "/admin/framework"),
        useTuneItem("Manage Threat Feeds", "/admin/threatfeed"),
        useTuneItem("APIs", "/admin/api"),
      ],
    },
  ];
}

export function useDashboardItems() {
  const dashboards = useAppSelector(selectDashboards);

  const nestedListItems = dashboards
    .filter((dash) => dash.isActive)
    .map((dash) => ({
      title: dash.name,
      link: `/dashboard/${dash.id}`,
      icon: dash.name.toLowerCase() === "home" ? "home" : undefined,
    }));

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
    title: "Frameworks",
    icon: "device_hub",
    isNested: true,
    nestedListItems: [...nestedListItems],
  };
}

// function useOverviewItem(link: string) {
//   return {
//     title: "Overview",
//     link,
//   };
// }

function useTuneItem(title: string, link: string) {
  return {
    title,
    link,
    icon: "tune",
  };
}
