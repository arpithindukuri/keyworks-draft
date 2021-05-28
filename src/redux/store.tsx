import { configureStore } from "@reduxjs/toolkit";
import { dashboardSlice } from "./dashboardSlice";
import { frameworkSlice } from "./frameworkSlice";

export const store = configureStore({
	reducer: {
		dashboard: dashboardSlice.reducer,
		framework: frameworkSlice.reducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
