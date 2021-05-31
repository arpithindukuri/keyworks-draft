import HighRiskAssets from "../components/widgets/HighRiskAssets";
import Ratings from "../components/widgets/Ratings";
import RatingTrends from "../components/widgets/RatingTrends";
import RegulatoryCompliance from "../components/widgets/RegulatoryCompliance";

export type WidgetIdType =
  | "ratings"
  | "trends"
  | "regcomp"
  | "highriskassets"
  | "globalmap"
  | "localmap"
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
    title: "Global Map",
    i: "globalmap",
    w: 10,
    h: 8,
    minW: 6,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
  {
    title: "Local Map",
    i: "localmap",
    w: 8,
    h: 6,
    minW: 6,
    minH: 4,
    maxW: 20,
    maxH: 20,
  },
];
