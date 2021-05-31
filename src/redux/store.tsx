import { configureStore } from "@reduxjs/toolkit";
import { dashboardSlice } from "./dashboardSlice";
import { frameworkSlice } from "./frameworkSlice";
import { threatFeedSlice } from "./threatFeedSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    framework: frameworkSlice.reducer,
    threatFeed: threatFeedSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
