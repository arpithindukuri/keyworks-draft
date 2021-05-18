import { v4 as uuidv4 } from "uuid";
import {
	createStyles,
	makeStyles,
	Typography,
	useTheme,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { Layout, WidthProvider, Responsive } from "react-grid-layout";
import { withResizeDetector } from "react-resize-detector";

import { AppContext, typeType } from "../../context/AppContext";
import HighRiskAssets from "../charts/HighRiskAssets";
import Ratings from "../charts/Ratings";
import RatingTrends from "../charts/RatingTrends";
import RegulatoryCompliance from "../charts/RegulatoryCompliance";

const ReactGridLayout = WidthProvider(
	withResizeDetector(Responsive, {
		refreshMode: "debounce",
		refreshRate: 50,
	})
);

const useStyles = makeStyles((theme) =>
	createStyles({
		"@keyframes fadeIn": {
			"0%": {
				opacity: 0,
			},
			"100%": {
				opacity: 1,
			},
		},
		selector: {
			animation: "$fadeIn 0.3s ease-in-out",
			// animationDelay: "0.5s",
			animationFillMode: "backwards",
		},
		placeholder: ({ height }: { height: number }) => ({
			display: "flex",
			position: "absolute",
			minHeight: "calc(100vh - 24px)",
			height: `calc(${height}px - 24px)`,
			top: "12px",
			left: "12px",
			right: "12px",
			transition: "0.3s",
			alignItems: "center",
			justifyContent: "center",
			pointerEvents: "none",
			touchAction: "none",
			border: `2px dashed ${theme.palette.grey[300]}`,
			color: theme.palette.grey[500],
			boxSizing: "border-box",
			overflowX: "hidden",
			overflowY: "visible",
		}),
		container: {
			minHeight: "100vh !important",
			transition: "0.3s",
			display: "flex",
			flexGrow: 1,
			overflow: "hidden !important",
			// overflowX: "hidden",
			// overflowY: "visible",
		},
	})
);

const dashboardData = [
	{
		name: "ratings",
		layoutData: { w: 3, h: 5, minW: 3, minH: 3 },
		element: Ratings,
	},
	{
		name: "trends",
		layoutData: { w: 5, h: 5, minW: 3, minH: 3 },
		element: RatingTrends,
	},
	{
		name: "regcomp",
		layoutData: { w: 4, h: 5, minW: 3, minH: 3 },
		element: Ratings,
	},
	{
		name: "highriskassets",
		layoutData: { w: 4, h: 5, minW: 3, minH: 3 },
		element: Ratings,
	},
];

export default function Dashboard({
	isSidebarOpen,
}: {
	isSidebarOpen: boolean;
}) {
	const theme = useTheme();

	const { state } = useContext(AppContext);
	const [height, setHeight] = useState(0);
	const [layout, setLayout] = useState<Layout[]>([
		// { i: "ratings", x: 0, y: 0, w: 3, h: 5, minW: 3, minH: 3 },
		// { i: "trends", x: 3, y: 0, w: 5, h: 5, minW: 3, minH: 3 },
		// { i: "regcomp", x: 0, y: 5, w: 4, h: 5, minW: 3, minH: 3 },
		// { i: "highriskassets", x: 4, y: 5, w: 4, h: 5, minW: 3, minH: 3 },
	]);
	const margin = theme.spacing(3);
	const rowHeight = 80;

	const classes = useStyles({ height: height });

	const getView = (view: typeType) => {
		if (view === "ratings") return <Ratings />;
		else if (view === "trends") return <RatingTrends />;
		else if (view === "regcomp") return <RegulatoryCompliance />;
		else if (view === "highriskassets") return <HighRiskAssets />;
		else if (view === null) return <></>;
	};

	const newIndex = dashboardData.findIndex(
		(data) => data.name === state.type
	);

	return (
		<div style={{ position: "relative" }}>
			<ReactGridLayout
				// useCSSTransforms={false}
				measureBeforeMount
				className={`layout ${classes.container}`}
				style={{ height: `${height}px` }}
				layouts={{
					lg: layout,
					md: layout,
					sm: layout,
					xs: layout,
					xxs: layout,
				}}
				onLayoutChange={(layout) => {
					if (!layout.find((li) => li.i === "__dropping-elem__")) {
						setLayout(() => layout);
					}
					let h = 0;
					layout.forEach((li) => {
						if (li.y + li.h > h) h = li.y + li.h;
					});
					setHeight(() => h * (rowHeight + margin) + margin);
				}}
				rowHeight={rowHeight}
				cols={{ lg: 8, md: 8, sm: 8, xs: 8, xxs: 8 }}
				margin={[margin, margin]}
				draggableHandle={".ModuleDragHandle"}
				droppingItem={
					newIndex !== -1
						? {
								i: "__dropping-elem__",
								...dashboardData[newIndex].layoutData,
						  }
						: { i: "__dropping-elem__", w: 3, h: 3 }
				}
				isDroppable
				onDrop={(layout, item) => {
					if (newIndex !== -1) {
						const newLI = {
							...item,
							...dashboardData[newIndex].layoutData,
							i: `${state.type}-${uuidv4()}`,
						};
						setLayout((prev) => {
							const newLayout = [...prev, newLI].sort((a, b) => {
								if (a.y < b.y) return -1;
								if (a.y > b.y) return 1;
								if (a.y === b.y) {
									if (a.x < b.x) return -1;
									if (a.x > b.x) return 1;
								}
								return 0;
							});
							return newLayout;
						});
					}
				}}
			>
				{layout.map((view) => {
					const viewEl = getView(view.i.split("-")[0] as typeType);
					return (
						<div
							key={view.i}
							className={
								view.i === "__dropping-elem__"
									? ""
									: classes.selector
							}
						>
							{viewEl ? viewEl : ""}
						</div>
					);
				})}
			</ReactGridLayout>
			<div className={classes.placeholder}>
				{layout.length === 0 && (
					<Typography variant='h4'>
						Drag views in from side bar
					</Typography>
				)}
			</div>
		</div>
	);
}
