import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Layout } from "react-grid-layout";

export interface Dashboard {
  id: string;
  isActive: boolean;
  name: string;
  owner: string;
  hasAccess: boolean;
  layout: Layout[];
}

export interface DashboardState {
  dashboards: Dashboard[];
}

const initialState: DashboardState = {
  dashboards: [
    {
      id: "risk-analysis-dashboard",
      isActive: true,
      name: "Risk Analysis",
      owner: "Stuart Smith",
      hasAccess: true,
      layout: [
        { i: "ratings", x: 0, y: 0, w: 5, h: 5 },
        { i: "trends", x: 5, y: 0, w: 6, h: 5 },
        { i: "regcomp", x: 0, y: 5, w: 4, h: 4 },
        {
          i: "highriskassets",
          x: 4,
          y: 5,
          w: 9,
          h: 5,
        },
      ],
    },
    {
      id: "compliance-monitoring-dashboard",
      isActive: true,
      name: "Compliance Monitoring",
      owner: "Nicole Lang",
      hasAccess: true,
      layout: [],
    },
    {
      id: "threat-monitoring-dashboard",
      isActive: false,
      name: "Threat Monitoring",
      owner: "Nicole Lang",
      hasAccess: false,
      layout: [],
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
  },
});

export const { add, remove, update, updateDashboardLayout, dropLayout } =
  dashboardSlice.actions;

export const selectDashboardSlice = (state: RootState) => state.dashboard;
export const selectDashboards = (state: RootState) =>
  state.dashboard.dashboards;

export const selectDashboardById = (id: string) =>
  createSelector(selectDashboardSlice, (dashboard) =>
    dashboard.dashboards.find((dash) => dash.id === id)
  );

export default dashboardSlice.reducer;
