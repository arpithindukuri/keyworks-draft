import { Button, ButtonGroup } from "@material-ui/core";
import { Edit, MoreVert } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";

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
        onClick={() => history.push(`/dashboard/manage/edit/${thisId}`)}
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
