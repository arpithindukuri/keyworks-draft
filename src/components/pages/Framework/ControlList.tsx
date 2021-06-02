import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Badge,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getColor } from "../../../util";
import { useState } from "react";
import classNames from "classnames";
import {
  Control,
  RequiredDocument,
  RequiredProcess,
} from "../../../redux/frameworkSlice";
import DocumentList from "./DocumentList";
import ProcessList from "./ProcessList";

const useStyles = makeStyles((theme) =>
  createStyles({
    expandButton: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    expandIcon: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandIconOpen: {
      transform: "rotate(180deg)",
    },
    tableBody: {
      display: "flex",
      // flexGrow: 1,
      width: "100%",
      boxSizing: "border-box",
      overflowY: "auto",
    },
    nested: {
      marginLeft: theme.spacing(3),
    },
    headerCell: {
      fontWeight: 800,
    },
    tableCell: {
      borderBottom: 0,
    },
    avatar: {
      margin: 0,
    },
  })
);

export default function ControlList({
  requiredDocs,
  requiredProcs,
  controls,
  expandParent,
  isNested = false,
}: {
  requiredDocs?: RequiredDocument[];
  requiredProcs?: RequiredProcess[];
  controls: Control[];
  expandParent?: () => void;
  isNested?: boolean;
}) {
  const classes = useStyles();

  return (
    <div className={`${classes.tableBody} ${isNested && classes.nested}`}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell} align="right">
              Control
            </TableCell>
            <TableCell className={classes.headerCell} align="left">
              Description
            </TableCell>
            <TableCell className={classes.headerCell} align="center">
              Severity
            </TableCell>
            {/* <TableCell className={classes.headerCell} align="center">
              Violations
            </TableCell> */}
            <TableCell className={classes.headerCell} align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {requiredDocs && (
            <DocumentList
              requiredDocs={requiredDocs}
              expandParent={expandParent}
            />
          )}
          {requiredProcs && (
            <ProcessList
              requiredProcs={requiredProcs}
              expandParent={expandParent}
            />
          )}
          {controls.map((row) => (
            <Row
              row={row}
              expandParent={expandParent ? expandParent : undefined}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DocumentRow() {
  return;
}

function Row({
  row,
  expandParent,
}: {
  row: Control;
  expandParent?: () => void;
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={`${row.id}-tablerow`}>
        <TableCell
          className={classes.tableCell}
          component="th"
          scope="row"
          align="right"
        >
          {row.id}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.description}
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <SeverityChip severity={row.severity} title={row.severity} />
        </TableCell>
        {/* <TableCell className={classes.tableCell} align="center" padding="none">
          <ViolationsChip number={row.numViolations} />
        </TableCell> */}
        <TableCell className={classes.tableCell} align="center" padding="none">
          <IconButton
            onClick={() => {
              setOpen((prev) => !prev);
              expandParent && expandParent();
            }}
          >
            <Badge
              // invisible={row.numViolations > 0}
              color="error"
              variant="dot"
            >
              <ExpandMoreIcon
                className={classNames(classes.expandIcon, {
                  [classes.expandIconOpen]: open,
                })}
              />
            </Badge>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow key={`${row.id}-tablerow-collapsible`}>
        <TableCell style={{ padding: 0, borderTop: 0 }} colSpan={5}>
          <Collapse
            in={open}
            timeout="auto"
            // unmountOnExit
            // collapsedHeight={100}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                paddingTop: 0,
                // backgroundColor: "#eee",
                justifyContent: "center",
              }}
            >
              {row.requiredDocuments && (
                <DocumentList
                  requiredDocs={row.requiredDocuments}
                  expandParent={expandParent}
                />
              )}
              {row.requiredProcesses && (
                <ProcessList
                  requiredProcs={row.requiredProcesses}
                  expandParent={expandParent}
                />
              )}
              {row.nestedControls && (
                <ControlList
                  controls={row.nestedControls}
                  expandParent={expandParent}
                  requiredDocs={row.requiredDocuments}
                  requiredProcs={row.requiredProcesses}
                  isNested
                />
              )}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function SeverityChip({
  severity,
  title,
}: {
  severity: string;
  title: string;
}) {
  const color = () => {
    if (severity === "Low") return getColor(0);
    else if (severity === "Medium") return getColor(0.5);
    else if (severity === "High") return getColor(1);
  };

  return (
    <Chip
      label={title}
      size="small"
      variant="outlined"
      style={{
        color: color(),
        fontWeight: 600,
        border: `2px solid ${color()}`,
      }}
    />
  );
}

function ViolationsChip({ number }: { number: number }) {
  return (
    <Chip
      label={number}
      // size='small'
      style={{
        color: "white",
        fontWeight: 600,
        backgroundColor: number === 0 ? "#dddddd" : getColor(1),
      }}
    />
  );
}
