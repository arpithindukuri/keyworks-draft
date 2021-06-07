import { Redirect } from "react-router";
import EditDashboard from "./components/pages/Dashboard/EditDashboard";
import ViewDashboard from "./components/pages/Dashboard/ViewDashboard";
import AllOverviews from "./components/pages/Framework/AllOverviews";
import FrameworkAdmin from "./components/pages/Framework/FrameworkAdmin";
import ManageFramework from "./components/pages/Framework/ManageFramework";
import ViewFramework from "./components/pages/Framework/ViewFramework";
import ManageThreatFeed from "./components/pages/ThreatFeed/ManageThreatFeed";

export interface Route {
  path: string;
  component: any;
  props?: { [key: string]: any };
}

export const routes: Route[] = [
  {
    path: "/admin/threatfeed",
    component: ManageThreatFeed,
  },
  {
    path: "/admin/framework/manage",
    component: ManageFramework,
  },
  {
    path: "/admin/framework",
    component: FrameworkAdmin,
  },
  {
    path: "/framework/overview",
    component: AllOverviews,
  },
  {
    path: "/framework/",
    component: ViewFramework,
  },
  {
    path: "/dashboard/edit",
    component: EditDashboard,
  },
  {
    path: "/dashboard",
    component: ViewDashboard,
  },
  {
    path: "/",
    component: RedirectToHome,
  },
];

export function RedirectToHome() {
  return <Redirect to="/dashboard/home" />;
}

// export function getElementFromPath(
// 	path: string,
// 	props?: { [key: string]: any }
// ) {
// 	switch (path) {
// 		case "/":
// 			return <Redirect to='/home' />;
// 		case "/home":
// 			return <Home />;
// 		case "/dashboard":
// 			return <Dashboard dashboardId={props?.dashboardId} />;
// 		case "/dashboard/manage":
// 			return <ManageDashboard />;
// 		case "/framework/overview":
// 			return <AllOverviews />;
// 		default:
// 			return <Home />;
// 	}
// }
