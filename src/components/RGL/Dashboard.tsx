import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles({
	"@keyframes fadeIn": {
		"0%": {
			opacity: 0,
		},
		"100%": {
			opacity: 1,
		},
	},
	selector: {
		animation: "$fadeIn 0.5s ease-in-out",
		animationDelay: "0.5s",
		animationFillMode: "backwards",
	},
	placeholder: {
		display: "flex",
		position: "absolute",
		top: 0,
		left: 0,
		height: "100vh",
		width: "100vw",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "2rem",
		pointerEvents: "none",
		touchAction: "none",
	},
	container: {
		minHeight: "100vh !important",
	},
});

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

export default function Dashboard() {
	const classes = useStyles();
	const { state } = useContext(AppContext);

	const [layout, setLayout] = useState<Layout[]>([
		// { i: "ratings", x: 0, y: 0, w: 3, h: 5, minW: 3, minH: 3 },
		// { i: "trends", x: 3, y: 0, w: 5, h: 5, minW: 3, minH: 3 },
		// { i: "regcomp", x: 0, y: 5, w: 4, h: 5, minW: 3, minH: 3 },
		// { i: "highriskassets", x: 4, y: 5, w: 4, h: 5, minW: 3, minH: 3 },
	]);

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
		<>
			<ReactGridLayout
				className={`layout ${classes.container}`}
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
				}}
				rowHeight={80}
				cols={{ lg: 8, md: 8, sm: 8, xs: 8, xxs: 8 }}
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
					console.log(layout);
					console.log(item);
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
							console.log([...prev, newLI]);
							console.log(newLayout);
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
							// className={
							// 	view.i === "__dropping-elem__"
							// 		? ""
							// 		: classes.selector
							// }
						>
							{viewEl ? viewEl : ""}
						</div>
					);
				})}
			</ReactGridLayout>
			{layout.length === 0 && (
				<div className={classes.placeholder}>
					Drag views in from side bar
				</div>
			)}
		</>
	);
}

/* <div key='ratings' className={classes.selector}>
				<Ratings />
			</div>
			<div key='trends' className={classes.selector}>
				<RatingTrends />
			</div>
			<div key='regcomp' className={classes.selector}>
				<RegulatoryCompliance />
			</div>
			<div key='highriskassets' className={classes.selector}>
				<HighRiskAssets />
			</div> */
