import { Card, CardContent } from "@material-ui/core";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactMapGL, { MapEvent, Source, ViewportProps } from "react-map-gl";
import { Layer } from "recharts";

const dataLayer = {
  id: "calgary-international-airport-766u7b",
  type: "fill",
  paint: {
    "fill-color": "#007cbf",
    "fill-opacity": 0.8,
  },
};

export default function Map({
  viewport,
  setViewport,
  children,
}: {
  viewport: ViewportProps;
  setViewport: Dispatch<SetStateAction<Partial<ViewportProps>>>;
  children?: any;
}) {
  const [data, setData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(
    { type: "FeatureCollection", features: [] }
  );

  const [hoverInfo, setHoverInfo] =
    useState<null | { x: number; y: number; feature: { [key: string]: any } }>(
      null
    );

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/arpithindukuri/keyworks-draft/master/src/data/calgary-international-airport.geojson"
    )
      .then((resp) => resp.json())
      .then((json) => setData(json));
  }, []);

  const onHover = useCallback((event: MapEvent) => {
    const { features } = event;
    const { offsetX, offsetY } = event.srcEvent as MouseEvent;
    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: offsetX,
            y: offsetY,
          }
        : null
    );
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport: any) => {
        setViewport(viewport);
      }}
      mapStyle="mapbox://styles/dannywantsmaps/ckplntm0x3ncs17qp8a0ddghl"
      interactiveLayerIds={["calgary-international-airport-766u7b"]}
      onHover={onHover}
      onMouseLeave={() => setHoverInfo(null)}
      onMouseOut={() => setHoverInfo(null)}
    >
      <Source
        id="calgary-international-airport-766u7b"
        type="geojson"
        data={data}
      >
        <Layer {...dataLayer} />
      </Source>
      {hoverInfo !== null && (
        <Card
          style={{
            pointerEvents: "none",
            touchAction: "none",
            position: "absolute",
            left: hoverInfo.x,
            top: hoverInfo.y,
          }}
        >
          <CardContent>
            Building: {hoverInfo.feature.properties.name}
          </CardContent>
        </Card>
      )}
      {children}
    </ReactMapGL>
  );
}
