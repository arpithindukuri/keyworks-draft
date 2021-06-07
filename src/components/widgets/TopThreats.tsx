import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Module from "../Module";
import { WebMercatorViewport, ViewportProps } from "react-map-gl";
import { useEffect, useState } from "react";
import { Pins, Threat, Threats } from "../../data/ThreatData";
import { Alert, AlertTitle } from "@material-ui/lab";
import Map from "./Map";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

export default function TopThreats() {
  const classes = useStyles();

  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 51.131604607782684,
    longitude: -114.00645002886303,
    zoom: 14.404946761461456,
  });

  return (
    <Module title="TOP THREATS">
      <div className={classes.body}>
        <Box flex={3}>
          <ThreatList />
        </Box>
        <Box flex={9}>
          <Map viewport={viewport} setViewport={setViewport}>
            <Pins threats={Threats} />
          </Map>
        </Box>
      </div>
    </Module>
  );
}

function ThreatList() {
  const [open, setOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  const handleClickOpen = (threat: Threat) => {
    setOpen(true);
    setSelectedThreat(threat);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedThreat(null);
  };

  return (
    <>
      <List>
        {Threats.map((threat) => (
          <ListItem button onClick={() => handleClickOpen(threat)}>
            <Alert severity={threat.severity} style={{ width: "100%" }}>
              <AlertTitle>{threat.description}</AlertTitle>
            </Alert>
          </ListItem>
        ))}
      </List>
      {selectedThreat && (
        <ThreatDialog
          isOpen={open}
          close={handleClose}
          threat={selectedThreat}
        />
      )}
    </>
  );
}

function ThreatDialog({
  isOpen,
  close,
  threat,
}: {
  isOpen: boolean;
  close: () => void;
  threat: Threat;
}) {
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 51.131752410211334,
    longitude: -114.00580603669299,
    zoom: 15.814352345006331,
  });

  const minLng = Math.min(...threat.points.map((item) => item.longitude));
  const minLat = Math.min(...threat.points.map((item) => item.latitude));
  const maxLng = Math.max(...threat.points.map((item) => item.longitude));
  const maxLat = Math.max(...threat.points.map((item) => item.latitude));

  const vp = new WebMercatorViewport({ height: 400, width: 800 });
  const { longitude, latitude, zoom } = vp.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    {
      padding: 40,
    }
  );

  useEffect(() => {
    setViewport(() => ({ longitude, latitude, zoom: Math.min(zoom, 16) }));
  }, [setViewport, longitude, latitude, zoom]);

  return (
    <Dialog
      onClose={close}
      aria-labelledby="simple-dialog-title"
      open={isOpen}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="simple-dialog-title">{threat.description}</DialogTitle>
      <DialogContent style={{ height: "90vh", display: "flex" }}>
        <Box flex={3}>
          <Typography>{threat.message}</Typography>
        </Box>
        <Box flex={9}>
          <Map viewport={viewport} setViewport={setViewport}>
            <Pins threats={[threat]} />
          </Map>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
