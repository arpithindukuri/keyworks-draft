import { Button, ButtonGroup } from "@material-ui/core";
import { Cancel, Edit, MoreVert, Save } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useHistory, useLocation } from "react-router";
import { selectDashboardById } from "../../../redux/dashboardSlice";
import { useAppSelector } from "../../../redux/hooks";

export default function DashboardActions() {
  const location = useLocation();
  const thisId = location.pathname.split("/")[2];
  const history = useHistory();

  return (
    <ButtonGroup
      variant="outlined"
      color="primary"
      disableElevation
      size="small"
    >
      <Button
        variant="contained"
        startIcon={<Edit />}
        onClick={() => history.push(`/dashboard/edit/${thisId}`)}
      >
        Edit
      </Button>
      <Button>Share</Button>
      <Button>
        <MoreVert />
      </Button>
    </ButtonGroup>
  );
}

export function DashboardEditActions() {
  const location = useLocation();
  const thisId = location.pathname.split("/")[3];
  const dashboard = useAppSelector(selectDashboardById(thisId));
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <ButtonGroup color="primary" disableElevation>
      <Button
        startIcon={<Cancel />}
        onClick={() => {
          history.push(`/dashboard/${thisId}`);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={() => {
          history.push(`/dashboard/${thisId}`);
          enqueueSnackbar(
            <>
              Successfully saved dashboard:&nbsp;
              <strong>{dashboard?.name || undefined}</strong>
            </>,
            { variant: "success" }
          );
        }}
      >
        Save
      </Button>
    </ButtonGroup>
  );
}
