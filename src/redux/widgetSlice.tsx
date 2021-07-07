import FrameworkCompliance from "../components/widgets/FrameworkCompliance";
import FrameworkAlerts from "../components/widgets/FrameworkAlerts";
import HighRiskAssets from "../components/widgets/HighRiskAssets";
import Ratings from "../components/widgets/Ratings";
import RatingTrends from "../components/widgets/RatingTrends";
import RegulatoryCompliance from "../components/widgets/RegulatoryCompliance";
import TopThreats from "../components/widgets/TopThreats";

// export type WidgetIdType =
//   | "ratings"
//   | "trends"
//   | "regcomp"
//   | "highriskassets"
//   | "topthreats"
//   | "compliance"
//   | "alerts"
//   | null;
export type WidgetIdType = string | null;

export interface Widget {
  title: string;
  i: string;
  w: number;
  h: number;
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
  hidden?: boolean;
}

export function getWidgetFromId(widgetId: string) {
  console.log(widgetId);
  if (widgetId.split("-")[0] === "ratings") return <Ratings />;
  if (widgetId.split("-")[0] === "trends") return <RatingTrends />;
  if (widgetId.split("-")[0] === "regcomp") return <RegulatoryCompliance />;
  if (widgetId.split("-")[0] === "highriskassets") return <HighRiskAssets />;
  if (widgetId.split("-")[0] === "topthreats") return <TopThreats />;
  if (widgetId.split("-")[0] === "compliance")
    return (
      <FrameworkCompliance
        thisId={widgetId.split("-").slice(1, -2).join("-")}
      />
    );
  if (widgetId.split("-")[0] === "alerts")
    return (
      <FrameworkAlerts thisId={widgetId.split("-").slice(1, -2).join("-")} />
    );
  return <></>;
}

export function getWidgetDetailsFromId(widgetId: WidgetIdType) {
  const result = widgetList.find((wid) => wid.i === widgetId);
  if (result !== undefined) return result;
  return widgetId === null
    ? undefined
    : widgetList.find((wid) => widgetId.includes(wid.i));
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
    hidden: true,
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
    hidden: true,
  },
];
