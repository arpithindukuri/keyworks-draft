import { Button, ButtonGroup } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useHistory, useLocation } from "react-router";
import { selectDashboardById } from "../../../redux/dashboardSlice";
import { useAppSelector } from "../../../redux/hooks";

export function FrameworkEditActions() {
  const location = useLocation();
  const thisId = location.pathname.split("/")[4];
  const framework = useAppSelector(selectDashboardById(thisId));
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <ButtonGroup color="primary" disableElevation>
      <Button
        startIcon={<Cancel />}
        onClick={() => {
          history.push(`/admin/framework`);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={() => {
          history.push(`/admin/framework`);
          enqueueSnackbar(
            <>
              Successfully saved framework:&nbsp;
              <strong>{framework?.name || "undefined"}</strong>
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
