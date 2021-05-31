import {
  createStyles,
  Fade,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import { withResizeDetector } from "react-resize-detector";

import { AppContext } from "../../../context/AppContext";
import { useAppDispatch } from "../../../redux/hooks";
import {
  updateDashboardLayout,
  dropLayout,
  Dashboard as DashboardType,
} from "../../../redux/dashboardSlice";
import {
  getWidgetDetailsFromId,
  getWidgetFromId,
  WidgetIdType,
} from "../../../redux/widgetSlice";
import DotGrid from "../../DotGrid";
import ErrorBoundary from "../../ErrorBoundary";

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
      animation: "$fadeIn 0.3s ease-in-out 0.25s",
      // animationDelay: "0.5s",
      animationFillMode: "backwards",
    },
    placeholder: ({ height }: { height: number }) => ({
      display: "flex",
      position: "absolute",
      minHeight: "calc(100vh - 90px)",
      height: `calc(${height}px - 90px)`,
      top: "12px",
      left: "12px",
      right: "12px",
      transition: "0.3s",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      touchAction: "none",
      // border: `2px dashed ${theme.palette.grey[300]}`,
      color: theme.palette.grey[500],
      boxSizing: "border-box",
      overflow: "visible",
    }),
    container: {
      minHeight: "calc(100vh - 66px) !important",
      transition: "0.3s",
      display: "flex",
      flexGrow: 1,
      overflow: "hidden !important",
      // overflowX: "hidden",
      // overflowY: "visible",
    },
  })
);

export default function Dashboard({
  dashboard,
  canEdit = false,
}: {
  dashboard: DashboardType;
  canEdit?: boolean;
}) {
  const theme = useTheme();
  const { state } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const thisId = dashboard.id;

  const [layout, setLayout] = useState<Layout[]>([]);
  const [isDotGridVisible, setIsDotGridVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const margin = theme.spacing(3);
  const rowHeight = 50;

  const classes = useStyles({ height: height });

  const newItemType = getWidgetDetailsFromId(state.type);

  useEffect(() => {
    setLayout(() =>
      dashboard.layout.map((widget) => {
        const widgetDefaults = getWidgetDetailsFromId(
          widget.i.split("-")[0] as WidgetIdType
        );
        return {
          ...widget,
          minW: widgetDefaults?.minW,
          minH: widgetDefaults?.minH,
          maxW: widgetDefaults?.maxW,
          maxH: widgetDefaults?.maxH,
        };
      })
    );
    console.log("changed");
  }, [dashboard.layout]);

  // const layout = dashboard.layout.map((widget) => {
  // 	const widgetDefaults = getWidgetDetailsFromId(
  // 		widget.i.split("-")[0] as WidgetIdType
  // 	);
  // 	return {
  // 		...widget,
  // 		minW: widgetDefaults?.minW,
  // 		minH: widgetDefaults?.minH,
  // 		maxW: widgetDefaults?.maxW,
  // 		maxH: widgetDefaults?.maxH,
  // 	};
  // });
  return (
    <div style={{ position: "relative" }}>
      <div className={classes.placeholder}>
        <Fade in={isDotGridVisible}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <DotGrid
              numX={16}
              numY={Math.max(
                Math.floor(height / (rowHeight + margin / 2)),
                Math.floor((window.innerHeight - 66) / (rowHeight + margin / 2))
              )}
              heightSpace={rowHeight + margin}
            />
          </div>
        </Fade>
        {/* {isDotGridVisible && (
					<DotGrid
						numX={16}
						numY={Math.max(
							Math.floor(height / (rowHeight + margin / 2)),
							Math.floor(
								(window.innerHeight - 66) /
									(rowHeight + margin / 2)
							)
						)}
						heightSpace={rowHeight + margin}
					/>
				)} */}
        {layout.length === 0 && (
          <Typography
            variant="h4"
            display="block"
            style={{ position: "absolute" }}
          >
            This Dashboard is Empty <br />
            {`Go to "Manage Dashboards" -> Find ${dashboard.name} -> Click edit`}
          </Typography>
        )}
      </div>
      <ErrorBoundary>
        <ReactGridLayout
          // useCSSTransforms={false}
          isDraggable={canEdit}
          isResizable={canEdit}
          isDroppable={canEdit}
          // measureBeforeMount
          className={`layout ${classes.container}`}
          // style={{ height: `${height}px` }}
          layouts={{
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout,
          }}
          width={1000}
          resizeHandles={["nw", "se"]}
          rowHeight={rowHeight}
          cols={{ lg: 16, md: 16, sm: 16, xs: 16, xxs: 16 }}
          margin={[margin, margin]}
          draggableHandle={".ModuleDragHandle"}
          onDragStart={() => {
            setIsDotGridVisible(true);
          }}
          onDragStop={(newLayout) => {
            setIsDotGridVisible(false);
            dispatch(
              updateDashboardLayout({
                id: thisId,
                newLayout: newLayout,
              })
            );
          }}
          onResizeStart={() => {
            setIsDotGridVisible(true);
          }}
          onResizeStop={(newLayout) => {
            setIsDotGridVisible(false);
            dispatch(
              updateDashboardLayout({
                id: thisId,
                newLayout: newLayout,
              })
            );
          }}
          onLayoutChange={(layout) => {
            if (!layout.find((li) => li.i === "__dropping-elem__")) {
              setLayout(() => layout);
              // dispatch(
              // 	updateDashboardLayout({
              // 		id: thisId,
              // 		newLayout: layout,
              // 	})
              // );
            }
            let h = 0;
            layout.forEach((li) => {
              if (li.y + li.h > h) h = li.y + li.h;
            });
            setHeight(() => h * (rowHeight + margin) + margin);
          }}
          droppingItem={
            newItemType !== undefined
              ? {
                  i: "__dropping-elem__",
                  w: newItemType.w,
                  h: newItemType.h,
                }
              : { i: "__dropping-elem__", w: 3, h: 3 }
          }
          onDrop={(layout, item) => {
            if (newItemType !== undefined) {
              const droppingElemIndex = layout.findIndex(
                (item) => item.i === "__dropping-elem__"
              );
              if (droppingElemIndex > -1) {
                let num = 0;
                for (let i = 0; i < layout.length; i++) {
                  num += layout[i].i.split("-")[0] === state.type ? 1 : 0;
                }
                const newLayoutItem = {
                  ...item,
                  ...newItemType,
                  i: `${state.type}-${dashboard.id}-${num}`,
                };
                const newLayout = layout;
                newLayout.splice(droppingElemIndex, 1, newLayoutItem);
                dispatch(
                  dropLayout({
                    id: thisId,
                    // newLayoutItem: newLI,
                    newLayout,
                  })
                );
              }
              // setLayout((prev) => {
              // 	const newLayout = [...prev, newLI].sort(
              // 		(a, b) => {
              // 			if (a.y < b.y) return -1;
              // 			if (a.y > b.y) return 1;
              // 			if (a.y === b.y) {
              // 				if (a.x < b.x) return -1;
              // 				if (a.x > b.x) return 1;
              // 			}
              // 			return 0;
              // 		}
              // 	);
              // 	return newLayout;
              // });
            }
          }}
        >
          {layout.map((widget) => {
            const widgetEl = getWidgetFromId(
              widget.i.split("-")[0] as WidgetIdType
            );
            return (
              <div
                key={widget.i}
                className={
                  widget.i === "__dropping-elem__" ? "" : classes.selector
                }
              >
                {widgetEl ? widgetEl : ""}
              </div>
            );
          })}
        </ReactGridLayout>
      </ErrorBoundary>
    </div>
  );
}
