import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { v4 } from "uuid";
import { RootState } from "./store";

export interface StixObject {}

export interface AvailableThreatFeed {
  id: string;
  isActive: boolean;
  name: string;
  url: string;
}

export interface ThreatFeed {
  id: string;
  isActive: boolean;
  name: string;
  username: string;
  password: string;
  token: string;
  url: string;
  lastSyncTimestamp: string;
  pollInterval: string;
}

export interface ThreatFeedState {
  availableThreatFeeds: AvailableThreatFeed[];
  threatFeeds: ThreatFeed[];
}

const initialState: ThreatFeedState = {
  availableThreatFeeds: [
    {
      id: "available-threat-feed-a",
      isActive: false,
      name: "feed A",
      url: "http://api.plos.org/search?q=title:DNA",
    },
    {
      id: "available-threat-feed-b",
      isActive: false,
      name: "feed B",
      url: "http://api.plos.org/search?q=title:DNA",
    },
    {
      id: "available-threat-feed-c",
      isActive: false,
      name: "feed C",
      url: "http://api.plos.org/search?q=title:DNA",
    },
    {
      id: "available-threat-feed-d",
      isActive: false,
      name: "feed D",
      url: "http://api.plos.org/search?q=title:DNA",
    },
    {
      id: "available-threat-feed-e",
      isActive: false,
      name: "feed E",
      url: "http://api.plos.org/search?q=title:DNA",
    },
  ],
  threatFeeds: [
    {
      id: "threat-feed-a",
      isActive: false,
      name: "feed A",
      username: "userA",
      password: "userApass",
      token: v4(),
      url: "http://api.plos.org/search?q=title:DNA",
      lastSyncTimestamp: format(new Date(), "T"),
      pollInterval: "1 hour",
    },
    {
      id: "threat-feed-b",
      isActive: false,
      name: "feed B",
      username: "userB",
      password: "userApass",
      token: v4(),
      url: "http://api.plos.org/search?q=title:DNA",
      lastSyncTimestamp: format(new Date(), "T"),
      pollInterval: "3 days",
    },
    {
      id: "threat-feed-c",
      isActive: false,
      name: "feed C",
      username: "userC",
      password: "userApass",
      token: v4(),
      url: "http://api.plos.org/search?q=title:DNA",
      lastSyncTimestamp: format(new Date(), "T"),
      pollInterval: "1 day",
    },
  ],
};

export const threatFeedSlice = createSlice({
  name: "threatFeed",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newThreatFeed: ThreatFeed }>) => {
      state.threatFeeds = [...state.threatFeeds, action.payload.newThreatFeed];
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.threatFeeds.findIndex(
        (threatFeed) => threatFeed.id === action.payload.id
      );
      if (index > -1) state.threatFeeds.splice(index, 1);
    },
    update: (
      state,
      action: PayloadAction<{ id: string; newThreatFeed: ThreatFeed }>
    ) => {
      const index = state.threatFeeds.findIndex(
        (threatFeed) => threatFeed.id === action.payload.id
      );
      if (index > -1) state.threatFeeds[index] = action.payload.newThreatFeed;
    },
  },
});

export const { add, remove, update } = threatFeedSlice.actions;

export const selectThreatFeedSlice = (state: RootState) => state.threatFeed;
export const selectThreatFeeds = (state: RootState) =>
  state.threatFeed.threatFeeds;
export const selectAvailableThreatFeeds = (state: RootState) =>
  state.threatFeed.availableThreatFeeds;

export const selectThreatFeedById = (id: string) =>
  createSelector(selectThreatFeedSlice, (threatFeed) =>
    threatFeed.threatFeeds.find((threatFeed) => threatFeed.id === id)
  );

export default threatFeedSlice.reducer;
