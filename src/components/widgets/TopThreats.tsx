import { makeStyles } from "@material-ui/core";
import Module from "../Module";
import ReactMapGL, { Source } from "react-map-gl";
import { useState } from "react";
import geoJson from "../../data/calgary-international-airport.json";

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

  const [viewport, setViewport] = useState({
    latitude: 51.131752410211334,
    longitude: -114.00580603669299,
    zoom: 15.814352345006331,
  });

  return (
    <Module title="RATING TRENDS">
      <div className={classes.body}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(viewport: any) => {
            setViewport(viewport);
          }}
          mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
          interactiveLayerIds={["data"]}
        >
          <Source
            type="geojson"
            /*
      // @ts-ignore */
            data={geoJson}
          />
        </ReactMapGL>
      </div>
    </Module>
  );
}
