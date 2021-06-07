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
        useTuneItem("Manage Users", "/admin/users"),
        useTuneItem("Manage Frameworks", "/admin/framework"),
        useTuneItem("Manage Corporate GIS", "/admin/corporateGIS"),
        useTuneItem("Manage Global GIS", "/admin/globalGIS"),
        useTuneItem("Manage Threat Feeds", "/admin/threatfeed"),
        useTuneItem("Manage APIs", "/admin/api"),
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

function useTuneItem(title: string, link: string) {
  return {
    title,
    link,
    icon: "tune",
  };
}
