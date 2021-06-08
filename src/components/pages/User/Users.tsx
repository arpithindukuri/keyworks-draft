import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Role, selectUsers } from "../../../redux/userSlice";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // boxSizing: "border-box",
      // margin: theme.spacing(3),
      flexGrow: 1,
      // overflow: "hidden",
    },
    container: {
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(2),
      maxHeight: "60vh",
    },
    tableHeader: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Column {
  id: "name" | "email" | "role" | "actions";
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
    id: "role",
    label: "Role",
    minWidth: 60,
    align: "center",
    format: (item: Role) => <Chip label={item} size="small" />,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 60,
    align: "right",
  },
];

export default function Users() {
  return (
    <Box padding={3}>
      <LocalUserList />
    </Box>
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
        title="Local Users"
        // style={{ paddingBottom: 0 }}
        action={
          <Button color="primary" variant="contained">
            Add User
          </Button>
        }
      />
      <Card className={classes.root}>
        <CardContent>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className={classes.tableHeader}
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
                            column.id === "actions" ? (
                              <ButtonGroup size="small" color="primary">
                                <Button>Edit User</Button>
                                <Button>Remove User</Button>
                              </ButtonGroup>
                            ) : (
                              user[column.id]
                            );
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
