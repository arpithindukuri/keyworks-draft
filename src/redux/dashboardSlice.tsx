import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Layout } from "react-grid-layout";

export interface Dashboard {
  id: string;
  name: string;
  layout: Layout[];
}

export interface DashboardState {
  dashboards: Dashboard[];
}

const initialState: DashboardState = {
  dashboards: [
    {
      id: "home",
      name: "My Home",
      layout: [
        {
          w: 5,
          h: 4,
          x: 11,
          y: 8,
          i: "ratings",
          minW: 5,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 5,
          h: 3,
          x: 11,
          y: 5,
          i: "trends",
          minW: 5,
          maxW: 20,
          minH: 3,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 4,
          h: 4,
          x: 12,
          y: 12,
          i: "regcomp",
          minW: 4,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 12,
          h: 4,
          x: 0,
          y: 12,
          i: "highriskassets",
          minW: 8,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 11,
          h: 7,
          x: 0,
          y: 5,
          i: "topthreats-risk-analysis-dashboard-0",
          minW: 6,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 0,
          i: "compliance-home-0",
          minW: 3,
          maxW: 10,
          minH: 4,
          maxH: 10,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 10,
          h: 5,
          x: 6,
          y: 0,
          i: "alerts-home-0",
          minW: 5,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
      ],
    },
    {
      id: "risk-analysis-dashboard",
      name: "Risk Analysis",
      layout: [
        {
          w: 16,
          h: 8,
          x: 0,
          y: 0,
          i: "topthreats-risk-analysis-dashboard-0",
          minW: 6,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 12,
          h: 4,
          x: 4,
          y: 8,
          i: "highriskassets-risk-analysis-dashboard-0",
          minW: 8,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
        {
          w: 4,
          h: 4,
          x: 0,
          y: 8,
          i: "regcomp-risk-analysis-dashboard-0",
          minW: 4,
          maxW: 20,
          minH: 4,
          maxH: 20,
          moved: false,
          static: false,
          isDraggable: true,
          isResizable: true,
          isBounded: true,
        },
      ],
    },
  ],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newDashboard: Dashboard }>) => {
      state.dashboards = [...state.dashboards, action.payload.newDashboard];
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.dashboards.findIndex(
        (dash) => dash.id === action.payload.id
      );
      if (index > -1) state.dashboards.splice(index, 1);
    },
    update: (
      state,
      action: PayloadAction<{ id: string; newDashboard: Dashboard }>
    ) => {
      const index = state.dashboards.findIndex(
        (dash) => dash.id === action.payload.id
      );
      if (index > -1) state.dashboards[index] = action.payload.newDashboard;
    },
    updateDashboardLayout: (
      state,
      action: PayloadAction<{ id: string; newLayout: Layout[] }>
    ) => {
      const index = state.dashboards.findIndex(
        (dash) => dash.id === action.payload.id
      );
      if (index > -1) state.dashboards[index].layout = action.payload.newLayout;
    },

    dropLayout: (
      state,
      action: PayloadAction<{ id: string; newLayout: Layout[] }>
    ) => {
      const index = state.dashboards.findIndex(
        (dash) => dash.id === action.payload.id
      );
      if (index > -1) {
        // const newLayout = [
        // 	...state.dashboards[index].layout,
        // 	action.payload.newLayoutItem,
        // ].sort((a, b) => {
        // 	if (a.y < b.y) return -1;
        // 	if (a.y > b.y) return 1;
        // 	if (a.y === b.y) {
        // 		if (a.x < b.x) return -1;
        // 		if (a.x > b.x) return 1;
        // 	}
        // 	return 0;
        // });
        // state.dashboards[index].layout = newLayout;
        // const newLayout = [
        // 	...state.dashboards[index].layout,
        // 	action.payload.newLayoutItem,
        // ];
        // console.log(newLayout);
        state.dashboards[index].layout = action.payload.newLayout;
      }
    },

    removeWidget: (
      state,
      action: PayloadAction<{ dashboardId: string; widgetId: string }>
    ) => {
      const index = state.dashboards.findIndex(
        (dash) => dash.id === action.payload.dashboardId
      );
      if (index > -1) {
        const widgetIndex = state.dashboards[index].layout.findIndex(
          (wid) => wid.i === action.payload.widgetId
        );
        if (widgetIndex > -1)
          state.dashboards[index].layout.splice(widgetIndex, 1);
      }
    },
  },
});

export const {
  add,
  remove,
  update,
  updateDashboardLayout,
  dropLayout,
  removeWidget,
} = dashboardSlice.actions;

export const selectDashboardSlice = (state: RootState) => state.dashboard;
export const selectDashboards = (state: RootState) =>
  state.dashboard.dashboards;

export const selectDashboardById = (id: string) =>
  createSelector(selectDashboardSlice, (dashboard) =>
    dashboard.dashboards.find((dash) => dash.id === id)
  );

export default dashboardSlice.reducer;
