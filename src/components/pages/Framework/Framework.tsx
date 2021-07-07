import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Collapse,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  makeStyles,
  TextField,
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
import { format } from "date-fns";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Control as ControlType,
  countActiveControlDocuments,
  countActiveControlProcesses,
  countActiveControls,
  countAllControls,
  countCompliantControls,
  countValidControlDocuments,
  countValidControlProcesses,
  Document,
  DataItem,
  Framework as FrameworkType,
  getControlsCompliance,
  Process,
  RequiredDocument,
  RequiredProcess,
  updateControl,
} from "../../../redux/frameworkSlice";
import { useAppDispatch } from "../../../redux/hooks";
import Module from "../../Module";
import PieChartRating from "../../widgets/PieChartRating";
import AlertList from "./AlertList";
import FrameworkSummary from "./FrameworkSummary";

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

  const numActive = countActiveControls(controls);
  const numCompliant = countCompliantControls(controls);

  return (
    <Grid className={classes.container} container spacing={3}>
      {canEdit && <EditHeader framework={framework} />}
      {!canEdit && (
        <Grid item xs={4} style={{ display: "flex" }}>
          <Module title="COMPLIANCE" cardStyles={{ flexGrow: "unset" }}>
            <Box padding={2}>
              <FrameworkSummary
                title={framework.name}
                subtitle=""
                percent={numCompliant / numActive}
                numControls={numActive}
                numControlsCompliant={numCompliant}
                numAlerts={framework.alerts.length}
                numViolations={numActive - numCompliant}
                link={`/framework/${framework.id}`}
              />
            </Box>
          </Module>
        </Grid>
      )}
      {!canEdit && (
        <Grid item xs={8}>
          <Module title="ALERTS">
            <Box padding={2} maxHeight="60vh" overflow="auto">
              <AlertList framework={framework} />
            </Box>
          </Module>
        </Grid>
      )}
      <Grid item xs={12}>
        <Module title="CONTROLS" useCard={false}>
          <Box>
            <ControlList
              frameworkId={framework.id}
              controls={controls}
              canEdit={canEdit}
            />
          </Box>
        </Module>
      </Grid>
    </Grid>
  );
}

function EditHeader({ framework }: { framework: FrameworkType }) {
  const total = countAllControls(framework.controls);
  const numActive = countActiveControls(framework.controls);

  const totalDocs = countActiveControlDocuments(framework.controls);
  const numDocs = countValidControlDocuments(framework.controls);

  const totalProcs = countActiveControlProcesses(framework.controls);
  const numProcs = countValidControlProcesses(framework.controls);

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
              <PieChartRating
                inverse
                variant="tiny"
                percent={numDocs / totalDocs}
              />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>{numDocs}</strong> of {totalDocs} Documents Present
              </Typography>
            </Box>
            <Box display="flex">
              <PieChartRating
                inverse
                variant="tiny"
                percent={numProcs / totalProcs}
              />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>{numProcs}</strong> of {totalProcs} Processes Present
              </Typography>
            </Box>
            {/* <Box display="flex">
              <PieChartRating inverse variant="tiny" percent={34 / 42} />
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginLeft: 16 }}
              >
                <strong>34</strong> of 42 Inputs Set
              </Typography>
            </Box> */}
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

function ControlList({
  frameworkId,
  controls,
  canEdit,
}: {
  frameworkId: string;
  controls: ControlType[];
  canEdit: boolean;
}) {
  return (
    <>
      {controls.map((control, index, arr) => (
        <Control
          frameworkId={frameworkId}
          canEdit={canEdit}
          control={control}
          last={index === arr.length - 1}
        />
      ))}
    </>
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(
      updateControl({
        frameworkId: frameworkId,
        controlId: control.id,
        newControl: {
          ...control,
          isActive: checked,
          nestedControls:
            control.nestedControls === undefined
              ? undefined
              : control.nestedControls.map((item) => ({
                  ...item,
                  isActive: checked,
                })),
        },
      })
    );
  };

  const isValid: boolean =
    control.nestedControls !== undefined
      ? countActiveControlDocuments(control.nestedControls) ===
          countValidControlDocuments(control.nestedControls) &&
        countActiveControlProcesses(control.nestedControls) ===
          countValidControlProcesses(control.nestedControls)
      : !control.requiredDocuments
          ?.map((item) => item.document === undefined)
          .includes(true) &&
        !control.requiredProcesses
          ?.map((item) => item.process === undefined)
          .includes(true);

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
          backgroundColor:
            control.isActive ||
            countActiveControls(control?.nestedControls || []) > 0
              ? undefined
              : theme.palette.background.default,
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
                <Checkbox
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  checked={control.isActive}
                  onChange={handleChange}
                />
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
                  control.isActive &&
                  (isValid ? (
                    <CheckCircle
                      style={{ color: theme.palette.success.main }}
                    />
                  ) : (
                    <NewReleases color="error" />
                  ))
                ) : (
                  <PieChartRating
                    inverse
                    variant="tiny"
                    percent={
                      control.compliance ||
                      getControlsCompliance(control.nestedControls || [])
                    }
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
                  <ControlRequiredDocument
                    frameworkId={frameworkId}
                    control={control}
                    reqDoc={reqDoc}
                    canEdit={canEdit}
                  />
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
                  <ControlRequiredProcess
                    frameworkId={frameworkId}
                    control={control}
                    reqProc={reqProc}
                    canEdit={canEdit}
                  />
                ))}
              </Grid>
            </Box>
          </AccordionDetails>
        )}
        {control.dataItems && (
          <AccordionDetails>
            <Box width="100%" boxSizing="border-box">
              <Grid
                container
                spacing={2}
                // style={{ backgroundColor: "#f9f7ff" }}
              >
                {control.dataItems.map((item) => (
                  <ControlDataItem item={item} canEdit={canEdit} />
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
  frameworkId,
  control,
  reqDoc,
  canEdit,
}: {
  frameworkId: string;
  control: ControlType;
  reqDoc: RequiredDocument;
  canEdit: boolean;
}) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = (document?: Document) => {
    setAddOpen(false);
    dispatch(
      updateControl({
        frameworkId,
        controlId: control.id,
        newControl: {
          ...control,
          requiredDocuments:
            control.requiredDocuments === undefined
              ? undefined
              : control.requiredDocuments.map((doc) =>
                  doc.name === reqDoc.name ? { name: doc.name, document } : doc
                ),
        },
      })
    );
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
            <RequirementSubItem title="STATUS">
              <Chip label={reqDoc.document.status} size="small" />
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
                onClick={handleAddOpen}
              >
                ADD A DOCUMENT
              </Button>
            ) : (
              <Typography>NO DOCUMENT FOUND</Typography>
            )}
          </Grid>
        )}
      </Grid>
      <AddDocumentDialog open={addOpen} handleClose={handleAddClose} />
    </>
  );
}

function ControlRequiredProcess({
  frameworkId,
  control,
  reqProc,
  canEdit,
}: {
  frameworkId: string;
  control: ControlType;
  reqProc: RequiredProcess;
  canEdit: boolean;
}) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = (process?: Process) => {
    setAddOpen(false);
    dispatch(
      updateControl({
        frameworkId,
        controlId: control.id,
        newControl: {
          ...control,
          requiredProcesses:
            control.requiredProcesses === undefined
              ? undefined
              : control.requiredProcesses.map((proc) =>
                  proc.name === reqProc.name
                    ? { name: proc.name, process }
                    : proc
                ),
        },
      })
    );
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
            <RequirementSubItem title="STATUS">
              <Chip label={reqProc.process.status} size="small" />
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
                onClick={handleAddOpen}
              >
                ADD A PROCESS
              </Button>
            ) : (
              <Typography>NO PROCESS FOUND</Typography>
            )}
          </Grid>
        )}
      </Grid>
      <AddProcessDialog open={addOpen} handleClose={handleAddClose} />
    </>
  );
}

function ControlDataItem({
  item,
  canEdit,
}: {
  item: DataItem;
  canEdit: boolean;
}) {
  const [value, setValue] = useState(item.value);

  const getInput = () => {
    if (item.type === "number")
      return (
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={value}
          type={canEdit ? "number" : "submit"}
          onChange={(e) => {
            setValue(parseInt(e.target.value));
          }}
        />
      );

    return <></>;
  };

  return (
    <>
      <Divider style={{ width: "100%" }} />
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={1} />
        <RequirementSubItem title="DATA ITEM">
          <Typography variant="body1">{item.name}</Typography>
        </RequirementSubItem>
        <Grid item xs container alignContent="center">
          {getInput()}
        </Grid>
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

export function PdfDialog({
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

function AddProcessDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (process?: Process) => void;
}) {
  const classes = useStyles();

  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog onClose={() => handleClose()} open={open} fullWidth maxWidth="md">
      <DialogTitle
        id="simple-dialog-title"
        style={{
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        Upload a Process
        <IconButton
          onClick={() => handleClose()}
          className={classes.closeButton}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {file ? (
          <>
            <Box
              border="2px dashed grey"
              bgcolor="#eee"
              height={300}
              marginBottom={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">
                Upload File: <u>{file.name}</u>?
              </Typography>
            </Box>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleClose({
                    id: file.name,
                    name: file.name,
                    dateUploaded: format(new Date(), "T"),
                    link: "https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf",
                    status: "in-effect",
                  })
                }
              >
                Upload
              </Button>
            </DialogActions>
          </>
        ) : (
          <Box
            {...getRootProps()}
            border="2px dashed grey"
            bgcolor="#eee"
            height={300}
            marginBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop file here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AddDocumentDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: (document?: Document) => void;
}) {
  const classes = useStyles();

  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog onClose={() => handleClose()} open={open} fullWidth maxWidth="md">
      <DialogTitle
        id="simple-dialog-title"
        style={{
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        Upload a Document
        <IconButton
          onClick={() => handleClose()}
          className={classes.closeButton}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {file ? (
          <>
            <Box
              border="2px dashed grey"
              bgcolor="#eee"
              height={300}
              marginBottom={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">
                Upload File: <u>{file.name}</u>?
              </Typography>
            </Box>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleClose({
                    id: file.name,
                    name: file.name,
                    dateUploaded: format(new Date(), "T"),
                    link: "https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf",
                    status: "in-effect",
                  })
                }
              >
                Upload
              </Button>
            </DialogActions>
          </>
        ) : (
          <Box
            {...getRootProps()}
            border="2px dashed grey"
            bgcolor="#eee"
            height={300}
            marginBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop file here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
