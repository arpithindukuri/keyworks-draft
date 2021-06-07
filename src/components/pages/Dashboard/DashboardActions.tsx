import {
  Box,
  Button,
  ButtonGroup,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Add, Cancel, Close, Edit, MoreVert, Save } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  add,
  remove,
  selectDashboardById,
} from "../../../redux/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      // width: "80vw",
      // height: "75vh",
      overflow: "visible",
      paddingBottom: theme.spacing(3),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

export default function DashboardActions() {
  const location = useLocation();
  const thisId = location.pathname.split("/")[2];
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
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
        <Button onClick={handleMenuOpen}>
          <MoreVert />
        </Button>
        <Menu
          id="dashboard-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleDialogOpen();
            }}
          >
            Add New Dashboard
          </MenuItem>
          {thisId !== "home" && (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                dispatch(remove({ id: thisId }));
                history.push(`/dashboard/home`);
              }}
            >
              Delete This Dashboard
            </MenuItem>
          )}
        </Menu>
      </ButtonGroup>
      <AddDialog open={open} handleClose={handleDialogClose} />
    </>
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

function AddDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (name.length === 0) return;
    dispatch(
      add({ newDashboard: { id: `dashboard-${name}`, name, layout: [] } })
    );
    handleClose();
    history.push(`/dashboard/dashboard-${name}`);
    enqueueSnackbar(
      <>
        Successfully added dashboard:&nbsp;
        <strong>{name}</strong>
      </>,
      { variant: "success" }
    );
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle
        id="simple-dialog-title"
        style={{
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        Add a Dashboard
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Box display="flex">
          <TextField
            id="standard-name"
            label="Name"
            value={name}
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  endIcon={<Add />}
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                >
                  Add
                </Button>
              ),
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
