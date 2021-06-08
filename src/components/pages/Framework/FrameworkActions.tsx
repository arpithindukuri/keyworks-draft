import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Assignment, Cancel, Save } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { selectFrameworkById } from "../../../redux/frameworkSlice";
import { useAppSelector } from "../../../redux/hooks";
import { PdfDialog } from "./Framework";

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function FrameworkActions() {
  const classes = useStyles();

  const location = useLocation();
  const thisId = location.pathname.split("/")[2];
  const framework = useAppSelector(selectFrameworkById(thisId));

  const [loadOpen, setLoadOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setLoadOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (loadOpen) {
      setTimeout(() => {
        setLoadOpen(false);
        setOpen(true);
      }, 1500);
    }
  }, [loadOpen]);

  return (
    <>
      <ButtonGroup variant="contained" color="primary" disableElevation>
        <Button startIcon={<Assignment />} onClick={handleClickOpen}>
          Report
        </Button>
      </ButtonGroup>
      <Backdrop
        className={classes.backdrop}
        open={loadOpen}
        onClick={handleClose}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <CircularProgress color="inherit" />
          </Box>
          <Typography variant="h6">Fetching Report</Typography>
        </Box>
      </Backdrop>
      {framework && (
        <PdfDialog
          title={framework.name}
          open={open}
          link="https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf"
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export function FrameworkEditActions() {
  const location = useLocation();
  const thisId = location.pathname.split("/")[4];
  const framework = useAppSelector(selectFrameworkById(thisId));
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
