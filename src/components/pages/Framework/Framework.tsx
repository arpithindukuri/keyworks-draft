import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  Checkbox,
  Chip,
  Collapse,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  CheckCircle,
  Close,
  Delete,
  ExpandMore,
  NewReleases,
  NoteAdd,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import classNames from "classnames";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
import {
  Control as ControlType,
  Framework as FrameworkType,
  recurseActiveControls,
  RequiredDocument,
  RequiredProcess,
  updateControl,
} from "../../../redux/frameworkSlice";
import { useAppDispatch } from "../../../redux/hooks";
import PieChartRating from "../../widgets/PieChartRating";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1.5),
      margin: 0,
      width: "100%",
    },
    accordion: {
      // transition: "0.15s",
      "&::after": {
        transform: "scale(0)",
        transformOrigin: "left",
        transition: "0.15s",
        content: '" "',
        position: "absolute",
        height: `calc(100% - ${theme.spacing(2)}px)`,
        width: 3,
        top: theme.spacing(1),
        left: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
      },
      "&.open": {
        // paddingLeft: theme.spacing(2.5),
        "&::after": {
          transform: "scaleX(1)",
        },
      },
    },
    dialog: {
      // width: "80vw",
      height: "75vh",
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

export default function Framework({
  framework,
  canEdit = false,
}: {
  framework: FrameworkType;
  canEdit?: boolean;
}) {
  const classes = useStyles();

  const controls = canEdit
    ? framework.controls
    : framework.controls.filter((item) => item.isActive);

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs>
        {canEdit && <EditHeader framework={framework} />}
        <CardHeader title="Controls" />
        <Box>
          {controls.map((control, index, arr) => (
            <Control
              frameworkId={framework.id}
              canEdit={canEdit}
              control={control}
              last={index === arr.length - 1}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

// function recurseThroughControls(control: ControlType, predicate: () => boolean) {
//   if (control.nestedControls === undefined) return false;
//   for (let i = 0; i < control.nestedControls.length; i++) {
//     const element = control.nestedControls[i];
//   }
//   return false;
// }

function EditHeader({ framework }: { framework: FrameworkType }) {
  const total = recurseActiveControls(
    framework.controls,
    (con) => con !== undefined
  );

  const numActive = recurseActiveControls(
    framework.controls,
    (con) => con.isActive
  );

  const [totalDocs] = useState(0);
  const [numDocs] = useState(0);

  recurseActiveControls(
    framework.controls,
    (con) =>
      con.isActive &&
      con.requiredDocuments !== undefined &&
      con.requiredDocuments
        .map((req) => req.document !== undefined)
        .includes(false)
  );

  recurseActiveControls(
    framework.controls,
    (con) =>
      con.isActive &&
      con.requiredDocuments !== undefined &&
      con.requiredDocuments
        .map((req) => req.document !== undefined)
        .includes(false)
  );

  return (
    <Grid item xs={12} container spacing={3}>
      <Grid item xs={12}>
        <Box width="100%">
          <Alert severity="warning">
            <Typography variant="body1">
              You are editing framework: <strong>{framework.name}</strong>
            </Typography>
          </Alert>
        </Box>
      </Grid>
      <Grid item xs={12} container>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box>
            <Box display="flex">
              <PieChartRating inverse variant="tiny" percent={14 / 24} />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>{numDocs}</strong> of {totalDocs} Documents Present
              </Typography>
            </Box>
            <Box display="flex">
              <PieChartRating inverse variant="tiny" percent={24 / 29} />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>24</strong> of 29 Processes Present
              </Typography>
            </Box>
            <Box display="flex">
              <PieChartRating inverse variant="tiny" percent={34 / 42} />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>34</strong> of 42 Inputs Set
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" color="textSecondary">
              <strong>{numActive}</strong> of {total} Controls Active
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

function Control({
  frameworkId,
  control,
  square = false,
  last = false,
  canEdit,
}: {
  frameworkId: string;
  control: ControlType;
  square?: boolean;
  last?: boolean;
  canEdit: boolean;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(
      updateControl({
        frameworkId: frameworkId,
        controlId: control.id,
        newControl: { ...control, isActive: checked },
      })
    );
    enqueueSnackbar(
      <>
        Successfully {checked ? "added" : "removed"} new control:&nbsp;
        <strong>{control.id}</strong>
      </>,
      { variant: "success" }
    );
  };

  const isValid =
    (control.requiredDocuments
      ? !control.requiredDocuments
          .map((req) => req.document !== undefined)
          .includes(false)
      : true) &&
    (control.requiredProcesses
      ? !control.requiredProcesses
          .map((req) => req.process !== undefined)
          .includes(false)
      : true);

  const nestedControls = canEdit
    ? control.nestedControls
    : control.nestedControls?.filter((item) => item.isActive);

  return (
    <>
      <Accordion
        expanded={open}
        onChange={(e) => setOpen((prev) => !prev)}
        style={{
          marginBottom: control.nestedControls ? 0 : undefined,
          borderBottomLeftRadius: last ? theme.shape.borderRadius : undefined,
          borderBottomRightRadius: last ? theme.shape.borderRadius : undefined,
        }}
        square={square}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          className={classNames(classes.accordion, { open: open })}
        >
          <Grid container spacing={3}>
            {canEdit && (
              <Grid item xs={1}>
                {control.nestedControls === undefined ? (
                  <Checkbox
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    checked={control.isActive}
                    onChange={handleChange}
                  />
                ) : (
                  ""
                )}
              </Grid>
            )}
            <Grid item xs={1}>
              <Typography color="textSecondary" variant="subtitle2">
                {control.id}
              </Typography>
            </Grid>
            <Grid item xs={canEdit ? 8 : 9}>
              <Typography variant="body1">{control.description}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              spacing={1}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Chip
                  label={control.severity}
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                {canEdit ? (
                  isValid ? (
                    <CheckCircle
                      style={{ color: theme.palette.success.main }}
                    />
                  ) : (
                    <NewReleases color="error" />
                  )
                ) : (
                  <PieChartRating
                    inverse
                    variant="tiny"
                    percent={Math.random()}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        {control.requiredDocuments && (
          <AccordionDetails>
            <Box width="100%" boxSizing="border-box">
              <Grid
                container
                spacing={2}
                style={{ backgroundColor: "#f9f7ff" }}
              >
                {control.requiredDocuments.map((reqDoc) => (
                  <ControlRequiredDocument reqDoc={reqDoc} canEdit={canEdit} />
                ))}
              </Grid>
            </Box>
          </AccordionDetails>
        )}
        {control.requiredProcesses && (
          <AccordionDetails>
            <Box width="100%" boxSizing="border-box">
              <Grid
                container
                spacing={2}
                style={{ backgroundColor: "#f9f7ff" }}
              >
                {control.requiredProcesses.map((reqProc) => (
                  <ControlRequiredProcess reqProc={reqProc} canEdit={canEdit} />
                ))}
              </Grid>
            </Box>
          </AccordionDetails>
        )}
      </Accordion>
      {nestedControls !== undefined && (
        <Collapse
          in={open}
          style={{
            marginBottom: open ? 16 : undefined,
            paddingLeft: 60,
            paddingRight: theme.shape.borderRadius * 2,
          }}
          unmountOnExit
        >
          <Divider light />
          {nestedControls.map((control, index, arr) => (
            <Control
              frameworkId={frameworkId}
              canEdit={canEdit}
              control={control}
              square={index === 0}
              last={index === arr.length - 1}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

function ControlRequiredDocument({
  reqDoc,
  canEdit,
}: {
  reqDoc: RequiredDocument;
  canEdit: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Divider style={{ width: "100%" }} />
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={1} />
        <RequirementSubItem title="DOCUMENT">
          <Typography variant="body1">{reqDoc.name}</Typography>
        </RequirementSubItem>
        {reqDoc.document ? (
          <>
            <RequirementSubItem title="FILE NAME">
              <Link
                component="button"
                variant="body1"
                onClick={handleClickOpen}
              >
                {reqDoc.document.name}
              </Link>
            </RequirementSubItem>
            <RequirementSubItem title="ACTIONS">
              <ButtonGroup size="small">
                <Button onClick={handleClickOpen}>View</Button>
                <Button>Share</Button>
                <Button>Download</Button>
                {canEdit && <Button startIcon={<Delete />}>Delete</Button>}
              </ButtonGroup>
            </RequirementSubItem>
            <PdfDialog
              title={reqDoc.document.name}
              open={open}
              link={reqDoc.document.link}
              handleClose={handleClose}
            />
          </>
        ) : (
          <Grid item alignContent="center">
            {canEdit ? (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<NoteAdd />}
              >
                ADD A DOCUMENT
              </Button>
            ) : (
              <Typography>NO DOCUMENT FOUND</Typography>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}

function ControlRequiredProcess({
  reqProc,
  canEdit,
}: {
  reqProc: RequiredProcess;
  canEdit: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Divider style={{ width: "100%" }} />
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={1} />
        <RequirementSubItem title="PROCESS">
          <Typography variant="body1">{reqProc.name}</Typography>
        </RequirementSubItem>
        {reqProc.process ? (
          <>
            <RequirementSubItem title="FILE NAME">
              <Link
                component="button"
                variant="body1"
                onClick={handleClickOpen}
              >
                {reqProc.process.name}
              </Link>
            </RequirementSubItem>
            <RequirementSubItem title="ACTIONS">
              <ButtonGroup size="small">
                <Button onClick={handleClickOpen}>View</Button>
                <Button>Share</Button>
                <Button>Download</Button>
                {canEdit && <Button startIcon={<Delete />}>Delete</Button>}
              </ButtonGroup>
            </RequirementSubItem>
            <PdfDialog
              title={reqProc.process.name}
              open={open}
              link={reqProc.process.link}
              handleClose={handleClose}
            />
          </>
        ) : (
          <Grid item xs container alignContent="center">
            {canEdit ? (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<NoteAdd />}
              >
                ADD A PROCESS
              </Button>
            ) : (
              <Typography>NO PROCESS FOUND</Typography>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}

function RequirementSubItem({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <Grid item xs container direction="column">
      <Grid item>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
}

function PdfDialog({
  title,
  open,
  link,
  handleClose,
}: {
  title: string;
  open: boolean;
  link: string;
  handleClose: () => void;
}) {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle
        id="simple-dialog-title"
        // classes={{ root: classes.dialog }}
        style={{
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        {title}
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <object
          data={link}
          // type='application/pdf'
          width="100%"
          height="100%"
        >
          <p>
            link to <a href={link}>link to{link}</a>
          </p>
        </object>
      </DialogContent>
    </Dialog>
  );
}
