import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  fade,
  Grid,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { selectAPIs } from "../../../redux/threatFeedSlice";
import { useAppSelector } from "../../../redux/hooks";
import { ThreatFeedSummary } from "./ManageThreatFeed";
import { ChangeEvent, useState } from "react";
import { selectUsers } from "../../../redux/userSlice";
import { v4 } from "uuid";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      width: "100%",
    },
    threatFeedSummary: {
      display: "flex",
      minHeight: "50px",
      padding: theme.spacing(2),
    },
    addNew: {
      display: "flex",
      minHeight: "50px",
      width: "100%",
      padding: theme.spacing(3.5),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.light, 0.1),
      border: `3px dashed ${fade(theme.palette.primary.main, 0.1)}`,
      color: fade(theme.palette.primary.dark, 0.7),
      fontSize: theme.typography.h6.fontSize,
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
    root: {
      // boxSizing: "border-box",
      // margin: theme.spacing(3),
      flexGrow: 1,
      // overflow: "hidden",
    },
    tableContainer: {
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(2),
      maxHeight: "70vh",
    },
    tableHeader: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Column {
  id: "name" | "email" | "hash";
  label: string;
  minWidth?: number;
  align: "right" | "center" | "left";
  format?: (item: any) => JSX.Element;
}

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 300,
    align: "left",
  },
  {
    id: "hash",
    label: "Hash",
    minWidth: 400,
    align: "left",
  },
];

export default function ManageAPI() {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={2}>
      <LocalUserList />
    </Grid>
  );
}

function LocalUserList() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const users = useAppSelector(selectUsers);
  return (
    <>
      <CardHeader
        title="API Users"
        style={{ width: "100%" }}
        action={
          <Box display="flex">
            <TextField
              label="Search"
              id="threat-feed-search-field"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Box marginLeft={3} display="flex">
              <ButtonGroup color="primary">
                <Button color="primary" variant="contained">
                  Add User
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        }
      />
      <Card className={classes.root}>
        <CardContent>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user.id}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id === "hash" ? `${v4()}` : user[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
