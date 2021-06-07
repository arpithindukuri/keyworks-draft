import { useTheme } from "@material-ui/core";
import { memo } from "react";
import { Marker } from "react-map-gl";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function PinsUnMemo({ threats }: { threats: Threat[] }) {
  const theme = useTheme();

  return threats.map((threat) =>
    threat.points.map((item) => (
      <Marker
        key={`marker-${item.latitude}-${item.longitude}`}
        longitude={item.longitude}
        latitude={item.latitude}
      >
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
            fill: theme.palette[threat.severity].main,
            stroke: "none",
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
          }}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    ))
  );
}

/*
// @ts-ignore */
export const Pins = memo(PinsUnMemo);

export interface Threat {
  description: string;
  severity: "error" | "warning" | "success";
  message: string;
  points: {
    longitude: number;
    latitude: number;
  }[];
}

export const Threats: Threat[] = [
  {
    description: "Bruteforce on Account",
    severity: "error",
    message:
      "Bruteforce on User Account ID : JSmith@ABC_INC.COM. IP address of internal machine 172.16.1.10 located in Calgary and locked out from remote machine 223.154.20.62 in China",
    points: [
      {
        longitude: -114.008756,
        latitude: 51.128474,
      },
      {
        longitude: 106.654405,
        latitude: 29.554115,
      },
    ],
  },
  {
    description: "Security door open forcefully",
    severity: "error",
    message: "Breach",
    points: [
      {
        longitude: -114.004395,
        latitude: 51.130264,
      },
    ],
  },
  {
    description: "Kiosk Down",
    severity: "warning",
    message: "Kiosk XYZ at ___ is not operational.",
    points: [
      {
        longitude: -114.007701,
        latitude: 51.133999,
      },
    ],
  },
];
