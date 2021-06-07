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

export interface API {
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
  threatFeeds: API[];
  apis: API[];
}

const createAPI = (name: string): API => ({
  id: `api-${name}`,
  isActive: Math.random() > 0.5,
  name,
  username: `user-${name}`,
  password: `user-${name}-pass`,
  token: v4(),
  url: "http://api.plos.org/search?q=title:DNA",
  lastSyncTimestamp: format(new Date(), "T"),
  pollInterval: Math.random() > 0.5 ? "1 hour" : "3 Days",
});

const initialState: ThreatFeedState = {
  threatFeeds: [
    createAPI("AbuseIPDB"),
    createAPI("Alexa Top 1 Million sites"),
    createAPI("Apility.io"),
    createAPI("APT Groups and Operations"),
    createAPI("AutoShun"),
    createAPI("Binary Defense IP Banlist"),
    createAPI("BGP Ranking"),
    createAPI("Botnet Tracker"),
    createAPI("BOTVRIJ.EU"),
    createAPI("BruteForceBlocker"),
    createAPI("C&C Tracker"),
    createAPI("CertStream"),
    createAPI("CCSS Forum Malware Certificates"),
    createAPI("CI Army List"),
    createAPI("Cisco Umbrella"),
    createAPI("Critical Stack Intel"),
    createAPI("Cyber Cure free intelligence feeds"),
    createAPI("DataPlane.org"),
    createAPI("DigitalSide Threat-Intel"),
    createAPI("Disposable Email Domains"),
    createAPI("DNSTrails"),
    createAPI("Emerging Threats Firewall Rules"),
    createAPI("Emerging Threats IDS Rules"),
    createAPI("ExoneraTor"),
    createAPI("Exploitalert"),
    createAPI("FastIntercept"),
    createAPI("ZeuS Tracker"),
    createAPI("FireHOL IP Lists"),
    createAPI("FraudGuard"),
    createAPI("Grey Noise"),
    createAPI("Hail a TAXII"),
    createAPI("HoneyDB"),
  ],
  apis: [
    createAPI("Icewater"),
    createAPI("Infosec - CERT-PA"),
    createAPI("InQuest Labs"),
    createAPI("I-Blocklist"),
    createAPI("IPsum"),
    createAPI("Kaspersky Threat Data Feeds"),
    createAPI("Majestic Million"),
    createAPI("Malc0de DNS Sinkhole"),
    createAPI("Maldatabase"),
    createAPI("Malpedia"),
    createAPI("MalShare.com"),
    createAPI("Maltiverse"),
    createAPI("Malware Domain List"),
    createAPI("Malware-Traffic-Analysis.net"),
    createAPI("MalwareDomains.com"),
    createAPI("MetaDefender Cloud"),
    createAPI("Netlab OpenData Project"),
    createAPI("NoThink!"),
    createAPI("NormShield Services"),
    createAPI("NovaSense Threats"),
    createAPI("OpenPhish Feeds"),
    createAPI("PhishTank"),
    createAPI("REScure Threat Intel Feed"),
    createAPI("Rutgers Blacklisted IPs"),
    createAPI("SANS ICS Suspicious Domains"),
    createAPI("signature-base"),
  ],
};

export const threatFeedSlice = createSlice({
  name: "threatFeed",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newThreatFeed: API }>) => {
      state.threatFeeds = [...state.threatFeeds, action.payload.newThreatFeed];
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.threatFeeds.findIndex(
        (threatFeed) => threatFeed.id === action.payload.id
      );
      if (index > -1) state.threatFeeds.splice(index, 1);
    },
    updateThreatFeed: (
      state,
      action: PayloadAction<{ id: string; newThreatFeed: API }>
    ) => {
      const index = state.threatFeeds.findIndex(
        (threatFeed) => threatFeed.id === action.payload.id
      );
      if (index > -1) state.threatFeeds[index] = action.payload.newThreatFeed;
    },
    updateAPI: (state, action: PayloadAction<{ id: string; newAPI: API }>) => {
      const index = state.apis.findIndex((api) => api.id === action.payload.id);
      if (index > -1) state.apis[index] = action.payload.newAPI;
    },
  },
});

export const { add, remove, updateThreatFeed, updateAPI } =
  threatFeedSlice.actions;

export const selectThreatFeedSlice = (state: RootState) => state.threatFeed;
export const selectThreatFeeds = (state: RootState) =>
  state.threatFeed.threatFeeds;
export const selectAPIs = (state: RootState) => state.threatFeed.apis;

export const selectThreatFeedById = (id: string) =>
  createSelector(selectThreatFeedSlice, (threatFeed) =>
    threatFeed.threatFeeds.find((threatFeed) => threatFeed.id === id)
  );

export default threatFeedSlice.reducer;
