import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { controlType } from "../components/pages/Framework/AllOverviews";
import { ISOAlerts, ISOControls } from "../components/pages/Framework/ISOData";
import {
	NISTAlerts,
	NISTControls,
} from "../components/pages/Framework/NISTData";
import { PCIAlerts, PCIControls } from "../components/pages/Framework/PCIData";
import { RootState } from "./store";

export interface Alert {
	title: string;
	child: JSX.Element;
	timestamp: string;
	severity: "error" | "info" | "success" | "warning";
	dismissalMessageChild?: JSX.Element;
}

export interface Input {
	name: string;
	status: "active" | "inactive";
}

export interface Control {
	id: string;
	name: string;
	description?: string;
	nestedControls?: Control[];
}

export interface RequiredDocument {
	name: string;
	description?: string;
	link?: string;
}

export interface Document {
	id: string;
	name: string;
	path: string;
}

export interface RequiredProcess {
	name: string;
	description?: string;
	link?: string;
}

export interface Process {
	id: string;
	name: string;
	path: string;
}

export interface Framework {
	id: string;
	name: string;
	dateAdopted: string;
	alerts: Alert[];
	controls: controlType[];
	inputs: Input[];
	documents: Document[];
	requiredDocuments: RequiredDocument[];
	processes: Process[];
	requiredProcesses: RequiredProcess[];
}

export interface FrameworkState {
	frameworks: Framework[];
}

const initialState: FrameworkState = {
	frameworks: [
		{
			id: "pci-framework-id",
			name: "PCI",
			dateAdopted: "111111111",
			alerts: PCIAlerts,
			inputs: [],
			controls: PCIControls,
			documents: [],
			requiredDocuments: [],
			processes: [],
			requiredProcesses: [],
		},
		{
			id: "iso27001-framework-id",
			name: "ISO27001",
			dateAdopted: "111111111",
			alerts: ISOAlerts,
			inputs: [],
			controls: ISOControls,
			documents: [],
			requiredDocuments: [],
			processes: [],
			requiredProcesses: [],
		},
		{
			id: "nist-framework-id",
			name: "NIST",
			dateAdopted: "111111111",
			alerts: NISTAlerts,
			inputs: [],
			controls: NISTControls,
			documents: [],
			requiredDocuments: [],
			processes: [],
			requiredProcesses: [],
		},
	],
};

export const frameworkSlice = createSlice({
	name: "framework",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<{ newFramework: Framework }>) => {
			state.frameworks = [
				...state.frameworks,
				action.payload.newFramework,
			];
		},
		remove: (state, action: PayloadAction<{ id: string }>) => {
			const index = state.frameworks.findIndex(
				(frame) => frame.id === action.payload.id
			);
			if (index > -1) state.frameworks.splice(index, 1);
		},
	},
});

export const { add, remove } = frameworkSlice.actions;

export const selectFrameworkSlice = (state: RootState) => state.framework;
export const selectFrameworks = (state: RootState) =>
	state.framework.frameworks;

export const selectFrameworkById = (id: string) =>
	createSelector(selectFrameworks, (frameworks) =>
		frameworks.find((frame) => frame.id === id)
	);

export default frameworkSlice.reducer;
