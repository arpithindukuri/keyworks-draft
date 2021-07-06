import FrameworkCompliance from "../components/widgets/FrameworkCompliance";
import FrameworkAlerts from "../components/widgets/FrameworkAlerts";
import HighRiskAssets from "../components/widgets/HighRiskAssets";
import Ratings from "../components/widgets/Ratings";
import RatingTrends from "../components/widgets/RatingTrends";
import RegulatoryCompliance from "../components/widgets/RegulatoryCompliance";
import TopThreats from "../components/widgets/TopThreats";
import { v4 } from "uuid";

export type WidgetIdType =
  | "ratings"
  | "trends"
  | "regcomp"
  | "highriskassets"
  | "topthreats"
  | "compliance"
  | "alerts"
  | null;

export interface Widget {
  title: string;
  i: WidgetIdType;
  w: number;
  h: number;
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
}

export function getWidgetFromId(widgetId: WidgetIdType) {
  switch (widgetId) {
    case "ratings":
      return <Ratings />;
    case "trends":
      return <RatingTrends />;
    case "regcomp":
      return <RegulatoryCompliance />;
    case "highriskassets":
      return <HighRiskAssets />;
    case "topthreats":
      return <TopThreats />;
    case "compliance":
      return <FrameworkCompliance thisId={v4()} />;
    case "alerts":
      return <FrameworkAlerts />;
    default:
      return <></>;
  }
}

export function getWidgetDetailsFromId(widgetId: WidgetIdType) {
  return widgetList.find((wid) => wid.i === widgetId);
}

export const widgetList: Widget[] = [
  {
    title: "Ratings",
    i: "ratings",
    w: 6,
    h: 6,
    minW: 5,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "Rating Trends",
    i: "trends",
    w: 8,
    h: 5,
    minW: 5,
    minH: 3,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "Regulatory Compliance",
    i: "regcomp",
    w: 4,
    h: 5,
    minW: 4,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "High Risk Assets",
    i: "highriskassets",
    w: 10,
    h: 7,
    minW: 8,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "Top Threats",
    i: "topthreats",
    w: 12,
    h: 8,
    minW: 6,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "Compliance",
    i: "compliance",
    w: 4,
    h: 6,
    minW: 3,
    minH: 4,
    maxW: 10,
    maxH: 10,
  },
  {
    title: "Alerts",
    i: "alerts",
    w: 9,
    h: 6,
    minW: 5,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
];
