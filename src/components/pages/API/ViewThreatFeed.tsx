import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  Checkbox,
  Chip,
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
  Cancel,
  CheckCircle,
  Close,
  MoreVert,
  Search,
} from "@material-ui/icons";
import ReactJson from "react-json-view";
import {
  API,
  selectThreatFeeds,
  updateThreatFeed,
} from "../../../redux/threatFeedSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

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

export default function ViewThreatFeed() {
  const classes = useStyles();

  const threatFeeds = useAppSelector(selectThreatFeeds);

  return (
    <Grid className={classes.container} container spacing={2}>
      <Header />
      {threatFeeds.map((dash) => (
        <ThreatFeedSummary
          key={`threatFeed-summary-${dash.id}`}
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
        title="Threat Intelligence Feeds"
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

export function ThreatFeedSummary({
  threatFeed,
  canEdit = true,
}: {
  threatFeed: API;
  canEdit?: boolean;
}) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.threatFeedSummary}>
        <Grid container direction="row" spacing={2}>
          {canEdit ? (
            <ThreatFeedSummaryItem title="ACTIVE">
              <Checkbox
                checked={threatFeed.isActive}
                color="primary"
                onChange={(e, checked) => {
                  dispatch(
                    updateThreatFeed({
                      id: threatFeed.id,
                      newThreatFeed: {
                        ...threatFeed,
                        isActive: checked,
                      },
                    })
                  );
                }}
              />
            </ThreatFeedSummaryItem>
          ) : null}
          <ThreatFeedSummaryItem title="NAME">
            <Typography>{threatFeed.name}</Typography>
          </ThreatFeedSummaryItem>
          {canEdit ? (
            <ThreatFeedSummaryItem title="URL">
              <Typography>
                <Link href={threatFeed.url} rel="noopener noreferrer">
                  <Typography
                    variant="body2"
                    style={{ maxWidth: "200px" }}
                    noWrap
                  >
                    {threatFeed.url}
                  </Typography>
                </Link>
              </Typography>
            </ThreatFeedSummaryItem>
          ) : null}
          <ThreatFeedSummaryItem title="LAST SYNCED">
            {format(
              parse(threatFeed.lastSyncTimestamp, "T", new Date()),
              "hh:mm bbb, eee LLLL Mo, y"
            )}
          </ThreatFeedSummaryItem>
          <ThreatFeedSummaryItem title="POLL INTERVAL">
            {threatFeed.pollInterval}
          </ThreatFeedSummaryItem>
        </Grid>
        {canEdit ? (
          <>
            <Divider flexItem orientation="vertical" variant="middle" />
            <ThreatFeedSummaryItem title="ACTIONS">
              <ButtonGroup
                variant="outlined"
                color="primary"
                disableElevation
                size="small"
              >
                <Button
                  variant="contained"
                  startIcon={<AssignmentTurnedIn />}
                  onClick={handleClickOpen}
                >
                  Test
                </Button>
                <Button>auth</Button>
                <Button onClick={handleClickOpen}>
                  <MoreVert />
                </Button>
              </ButtonGroup>
            </ThreatFeedSummaryItem>
          </>
        ) : (
          <Chip
            label={threatFeed.isActive ? "Active" : "Inactive"}
            icon={
              threatFeed.isActive ? <CheckCircle /> : <Cancel color="error" />
            }
          />
        )}
        <TestDialog
          title={threatFeed.name}
          open={open}
          // url={threatFeed.url}
          handleClose={handleClose}
        />
      </Paper>
    </Grid>
  );
}

function ThreatFeedSummaryItem({
  title,
  children,
  xs,
}: {
  title: string;
  children: any;
  xs?: GridSize;
}) {
  return (
    <Grid
      item
      xs={xs || true}
      container
      direction="column"
      // alignItems='center'
    >
      <Grid item>
        <Typography color="textSecondary" variant="subtitle2">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container alignContent="center">
        {children}
      </Grid>
    </Grid>
  );
}

function TestDialog({
  title,
  open,
  handleClose,
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
}) {
  const classes = useStyles();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
  }, []);

  useEffect(() => {
    if (open) setData(null);
  }, [open]);

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
        Testing: {title}
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Box display="flex" marginY={1}>
          <Box flexGrow={1} display="flex" flexDirection="column" paddingX={2}>
            <TextField
              label="Token"
              id="password-field"
              variant="outlined"
              size="small"
            />
          </Box>
          <Divider orientation="vertical" />
          <Box flexGrow={1} display="flex" flexDirection="column" paddingX={2}>
            <TextField
              label="Username"
              id="username-field"
              variant="outlined"
              size="small"
            />
            <TextField
              label="Password"
              id="password-field"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setData(getJson())}
        >
          Test
        </Button>
        <Box marginBottom={2} />
        <Divider />
        {data !== null && <ReactJson src={data} theme="monokai" />}
      </DialogContent>
    </Dialog>
  );
}

const getJson = () => {
  return {
    response: {
      numFound: 5418,
      start: 0,
      maxScore: 6.539637,
      docs: [
        {
          id: "10.1371/journal.pone.0000290",
          journal: "PLoS ONE",
          eissn: "1932-6203",
          publication_date: "2007-03-14T00:00:00Z",
          article_type: "Research Article",
          author_display: [
            "Rayna I. Kraeva",
            "Dragomir B. Krastev",
            "Assen Roguev",
            "Anna Ivanova",
            "Marina N. Nedelcheva-Veleva",
            "Stoyno S. Stoynov",
          ],
          abstract: [
            "Nucleic acids, due to their structural and chemical properties, can form double-stranded secondary structures that assist the transfer of genetic information and can modulate gene expression. However, the nucleotide sequence alone is insufficient in explaining phenomena like intron-exon recognition during RNA processing. This raises the question whether nucleic acids are endowed with other attributes that can contribute to their biological functions. In this work, we present a calculation of thermodynamic stability of DNA/DNA and mRNA/DNA duplexes across the genomes of four species in the genus Saccharomyces by nearest-neighbor method. The results show that coding regions are more thermodynamically stable than introns, 3′-untranslated regions and intergenic sequences. Furthermore, open reading frames have more stable sense mRNA/DNA duplexes than the potential antisense duplexes, a property that can aid gene discovery. The lower stability of the DNA/DNA and mRNA/DNA duplexes of 3′-untranslated regions and the higher stability of genes correlates with increased mRNA level. These results suggest that the thermodynamic stability of DNA/DNA and mRNA/DNA duplexes affects mRNA transcription.",
          ],
          title_display:
            "Stability of mRNA/DNA and DNA/DNA Duplexes Affects mRNA Transcription",
          score: 6.539637,
        },
      ],
    },
  };
};
