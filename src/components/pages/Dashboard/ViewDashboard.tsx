import { Typography } from "@material-ui/core";
import { useLocation } from "react-router";
import { selectDashboardById } from "../../../redux/dashboardSlice";
import { useAppSelector } from "../../../redux/hooks";
import Dashboard from "./Dashboard";

export default function ViewDashboard() {
	const location = useLocation();
	const thisId = location.pathname.split("/")[2];
	const dashboard = useAppSelector(selectDashboardById(thisId));

	if (dashboard !== undefined) return <Dashboard dashboard={dashboard} />;

	return <Typography variant='h4'>404: No such dashboard found</Typography>;
}
