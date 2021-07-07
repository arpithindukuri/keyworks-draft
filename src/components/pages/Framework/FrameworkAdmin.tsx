import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, MoreVert, Search } from "@material-ui/icons";
import { format, parse } from "date-fns";
import Fuse from "fuse.js";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AvailableFrameworks } from "../../../data/AvailableFrameworks";
import { ISOAlerts, ISOControls } from "../../../data/ISOData";
import { NISTAlerts, NISTControls } from "../../../data/NISTData";
import { PCIAlerts, PCIControls } from "../../../data/PCIData";
import {
  add,
  Alert,
  AvailableFramework,
  Control,
  Framework,
  selectFrameworks,
} from "../../../redux/frameworkSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1.5),
      margin: 0,
      width: "100%",
    },
    frameworkSummary: {
      display: "flex",
      minHeight: "50px",
      padding: theme.spacing(2),
    },
    tableHeader: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.secondary,
    },
  })
);

export default function FrameworkAdmin() {
  const classes = useStyles();

  const frameworks = useAppSelector(selectFrameworks);
  return (
    <Grid className={classes.container} container spacing={3}>
      <AddFramework />
      {frameworks.map((frame) => (
        <FrameworkSummary
          key={`framework-summary-${frame.id}`}
          framework={frame}
        />
      ))}
    </Grid>
  );
}

function AddFramework() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={12} md={12}>
        <CardHeader
          title="Active Frameworks"
          titleTypographyProps={{ variant: "h4" }}
          action={
            <ButtonGroup color="primary">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleClickOpen}
              >
                Add Framework
              </Button>
            </ButtonGroup>
          }
        />
      </Grid>
      <AddFrameworkDialog isOpen={open} close={handleClose} />
    </>
  );
}

function FrameworkSummary({ framework }: { framework: Framework }) {
  const history = useHistory();

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          title={framework.name}
          // titleTypographyProps={{ variant: "h4" }}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <SubItem title="DATE ADOPTED">
              <Typography>
                {format(
                  parse(framework.dateAdopted, "T", new Date()),
                  "hh:mm bbb, eee LLLL Mo, y"
                )}
              </Typography>
            </SubItem>
            <SubItem title="LAST MODIFIED">
              <Typography>
                {format(
                  parse(framework.dateAdopted, "T", new Date()),
                  "hh:mm bbb, eee LLLL Mo, y"
                )}
              </Typography>
            </SubItem>
            <SubItem title="ACTIONS">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>
                  history.push(`/admin/framework/manage/${framework.id}`)
                }
              >
                Manage
              </Button>
              <Box marginTop={1}>
                <ButtonGroup fullWidth>
                  <Button
                    onClick={() => history.push(`/framework/${framework.id}`)}
                  >
                    View
                  </Button>
                  <Button>Renew</Button>
                  <Button>Remove</Button>
                </ButtonGroup>
              </Box>
            </SubItem>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

function SubItem({ title, children }: { title: string; children: any }) {
  return (
    <Grid item>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      {children}
    </Grid>
  );
}

function AddFrameworkDialog({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [selectedFramework, setSelectedFramework] =
    useState<AvailableFramework | null>(null);

  useEffect(() => {
    if (isOpen) setSelectedFramework(null);
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
      style={{ transition: "0.3s" }}
    >
      <DialogTitle id="form-dialog-title">Add a Framework</DialogTitle>
      <DialogContent style={{ paddingTop: 0 }}>
        {selectedFramework === null ? (
          <AvailableFrameworkList setSelectedFramework={setSelectedFramework} />
        ) : (
          <ValidateFramework
            framework={selectedFramework}
            back={() => setSelectedFramework(null)}
            close={close}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function AvailableFrameworkList({
  setSelectedFramework,
}: {
  setSelectedFramework: (framework: AvailableFramework) => void;
}) {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const options: Fuse.IFuseOptions<AvailableFramework> = {
    keys: ["name"],
    threshold: 0.3,
  };
  const fuse = new Fuse(AvailableFrameworks, options);
  const addedFrameworks = useAppSelector(selectFrameworks);

  return (
    <>
      <Box width="100%">
        <FormControl fullWidth>
          <InputLabel htmlFor="add-framework-search-field">
            <Box paddingLeft={3}>Search</Box>
          </InputLabel>
          <FilledInput
            id="add-framework-search-field"
            type="search"
            fullWidth
            endAdornment={<Search />}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Table stickyHeader>
        <TableHead className={classes.tableHeader}>
          <TableCell>Framework</TableCell>
          <TableCell>Link</TableCell>
          <TableCell></TableCell>
        </TableHead>
        {(search.length === 0
          ? AvailableFrameworks
          : fuse.search(search).map((result) => result.item)
        ).map((framework) => {
          const isEnabled =
            addedFrameworks.find((val) => val.name === framework.name) ===
            undefined;
          return (
            <TableRow>
              <TableCell>
                <Typography
                  variant="body2"
                  color={isEnabled ? undefined : "textSecondary"}
                >
                  {isEnabled ? framework.name : `${framework.name} (Added)`}
                </Typography>
              </TableCell>
              <TableCell>{framework.link}</TableCell>
              <TableCell padding="none" align="right">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setSelectedFramework(framework)}
                  disabled={!isEnabled}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </>
  );
}

function ValidateFramework({
  framework,
  back,
  close,
}: {
  framework: AvailableFramework;
  back: () => void;
  close: () => void;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [license, setLicense] = useState("");
  const [error, setError] = useState<
    "Cannot be empty" | "Invalid License Key" | "success"
  >("success");

  const getAlerts = (name: string): Alert[] => {
    if (name === "PCI DSS") return PCIAlerts;
    if (name === "ISO 27001") return ISOAlerts;
    if (name === "NIST CSF") return NISTAlerts;
    return [];
  };

  const getControls = (name: string): Control[] => {
    if (name === "PCI DSS") return PCIControls;
    if (name === "ISO 27001") return ISOControls;
    if (name === "NIST CSF") return NISTControls;
    return [];
  };

  const handleAdd = () => {
    if (license.length === 0) setError(() => "Cannot be empty");
    // else if (error !== "Invalid License Key")
    //   setError(() => "Invalid License Key");
    else {
      setError("success");
      dispatch(
        add({
          newFramework: {
            id: framework.id,
            name: framework.name,
            alerts: getAlerts(framework.name),
            controls: getControls(framework.name),
            dateAdopted: format(new Date(), "T"),
          },
        })
      );
      enqueueSnackbar(
        <>
          Successfully added new framework:&nbsp;
          <strong>{framework.name}</strong>
        </>,
        { variant: "success" }
      );
      close();
    }
  };

  return (
    <>
      <DialogContentText>
        Please enter your license key for <strong>{framework.name}</strong>
      </DialogContentText>
      <FormControl fullWidth>
        <TextField
          type="enter"
          variant="outlined"
          label="License Key"
          error={error !== "success"}
          helperText={error !== "success" && error}
          id="add-framework-license-field"
          fullWidth
          inputProps={{
            endAdornment: <Search />,
          }}
          value={license}
          onChange={(event) => {
            setLicense(event.target.value);
          }}
        />
      </FormControl>
      <DialogActions>
        <Button onClick={back} color="primary">
          Back
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </>
  );
}
