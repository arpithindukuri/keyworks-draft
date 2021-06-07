import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  CardHeader,
  Checkbox,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  fade,
  Grid,
  GridSize,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  AssignmentTurnedIn,
  Close,
  MoreVert,
  Search,
} from "@material-ui/icons";
import ReactJson from "react-json-view";
import { API, selectAPIs, updateAPI } from "../../../redux/threatFeedSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { ThreatFeedSummary } from "./ManageThreatFeed";

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
  })
);

export default function ManageAPI() {
  const classes = useStyles();

  const threatFeeds = useAppSelector(selectAPIs);

  return (
    <Grid className={classes.container} container spacing={2}>
      <Header />
      {threatFeeds.map((dash) => (
        <ThreatFeedSummary key={`api-summary-${dash.id}`} threatFeed={dash} />
      ))}
    </Grid>
  );
}

function Header() {
  return (
    <Grid item xs={12}>
      <CardHeader
        title="APIs"
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
                <Button>Manage API Users</Button>
                <Button variant="contained">Add New Feed</Button>
              </ButtonGroup>
            </Box>
          </Box>
        }
      />
    </Grid>
  );
}
