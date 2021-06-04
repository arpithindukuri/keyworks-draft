import {
  Chip,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Module from "../Module";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    // height: "100%",
    margin: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    boxSizing: "border-box",
    overflowY: "auto",
  },
  headerCell: {
    fontWeight: 800,
  },
  avatar: {
    margin: 0,
  },
}));

function createData(
  asset: string,
  owner: string,
  severity: string,
  risk: number
) {
  return { asset, owner, severity, risk };
}

const rows = [
  createData("Frozen yoghurt", "Owner A", "High", 24),
  createData("Ice cream sandwich", "Owner B", "Low", 37),
  createData("Eclair", "Owner D", "Low", 24),
  createData("Cupcake", "Owner A", "Low", 67),
  createData("Gingerbread", "Owner A", "Medium", 49),
];

function SeverityChip({
  severity,
  title,
}: {
  severity: string;
  title: string;
}) {
  const getColor = () => {
    if (severity === "Low") return "green";
    else if (severity === "Medium") return "orange";
    else if (severity === "High") return "red";
  };

  return (
    <Chip
      label={title}
      size="small"
      variant="outlined"
      style={{
        color: getColor(),
        fontWeight: 600,
        border: `2px solid ${getColor()}`,
      }}
    />
  );
}

export default function HighRiskAssets() {
  const classes = useStyles();

  return (
    <Module title="HIGH RISK ASSETS">
      <div className={classes.body}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Asset</TableCell>
              <TableCell className={classes.headerCell} align="right">
                Owner
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                Severity
              </TableCell>
              <TableCell className={classes.headerCell} align="right">
                Risk
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={`${row.asset}-tablerow`}>
                <TableCell component="th" scope="row">
                  {row.asset}
                </TableCell>
                <TableCell align="right">{row.owner}</TableCell>
                <TableCell align="right">
                  <SeverityChip severity={row.severity} title={row.severity} />
                </TableCell>
                <TableCell align="right">{row.risk}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Module>
  );
}
