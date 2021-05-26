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
	| "localmap";

export interface Widget {
	title: string;
	i: WidgetIdType;
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

export const widgetList: Widget[] = [
	{
		title: "Ratings",
		i: "ratings",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
	{
		title: "Rating Trends",
		i: "trends",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
	{
		title: "Regulatory Compliance",
		i: "regcomp",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
	{
		title: "High Risk Assets",
		i: "highriskassets",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
	{
		title: "Global Map",
		i: "globalmap",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
	{
		title: "Local Map",
		i: "localmap",
		minW: 3,
		minH: 3,
		maxW: 10,
		maxH: 10,
	},
];
