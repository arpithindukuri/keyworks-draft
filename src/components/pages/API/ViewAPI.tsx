import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  createStyles,
  fade,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { selectAPIs } from "../../../redux/threatFeedSlice";
import { useAppSelector } from "../../../redux/hooks";
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
        <ThreatFeedSummary
          key={`api-summary-${dash.id}`}
          threatFeed={dash}
          canEdit={false}
        />
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
          </Box>
        }
      />
    </Grid>
  );
}
