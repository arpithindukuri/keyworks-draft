import { Redirect } from "react-router";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import ManageDashboard from "./components/pages/Dashboard/ManageDashboard";
import AllOverviews from "./components/pages/Framework/AllOverviews";
import Home from "./components/pages/Home/Home";

export interface Route {
	path: string;
	component: any;
	props?: { [key: string]: any };
}

export const routes: Route[] = [
	{
		path: "/framework/overview",
		component: AllOverviews,
	},
	{
		path: "/dashboard/manage",
		component: ManageDashboard,
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/dashboard",
		component: Dashboard,
	},
	{
		path: "/",
		component: RedirectToHome,
	},
];

export function RedirectToHome() {
	return <Redirect to='/home' />;
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
