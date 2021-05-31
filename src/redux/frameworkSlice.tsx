import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
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
  dateUploaded: string;
  description?: string;
  nestedControls?: Control[];
}

export interface RequiredDocument {
  name: string;
  description?: string;
  link?: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  dateUploaded: string;
  link: string;
}

export interface RequiredProcess {
  name: string;
  description?: string;
  link?: string;
  processes: Process[];
}

export interface Process {
  id: string;
  name: string;
  dateUploaded: string;
  link: string;
}

export interface Framework {
  id: string;
  name: string;
  dateAdopted: string;
  alerts: Alert[];
  controls: controlType[];
  inputs: Input[];
  requiredDocuments: RequiredDocument[];
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
      requiredDocuments: [
        {
          name: "Documents List 1",
          description: "description of doc1",
          documents: [
            {
              id: "doc1a-id",
              name: "doc1a",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "doc1b-id",
              name: "doc1b",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "doc1c-id",
              name: "doc1c",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "doc1d-id",
              name: "doc1d",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
          ],
        },
        {
          name: "Empty List of Documents",
          description: "description of doc2",
          documents: [],
        },
      ],
      requiredProcesses: [
        {
          name: "Process List 1",
          description: "description of doc1",
          processes: [
            {
              id: "proc1a-id",
              name: "proc1a",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "proc1b-id",
              name: "proc1b",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "proc1c-id",
              name: "proc1c",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
            {
              id: "proc1d-id",
              name: "proc1d",
              dateUploaded: format(new Date(), "T"),
              link: "http://www.abatement.com/wp/wp-content/uploads/2020/10/pages-1.pdf",
            },
          ],
        },
        {
          name: "Empty List of Processes",
          description: "description of proc2",
          processes: [],
        },
      ],
    },
    {
      id: "iso27001-framework-id",
      name: "ISO27001",
      dateAdopted: "111111111",
      alerts: ISOAlerts,
      inputs: [],
      controls: ISOControls,
      requiredDocuments: [],
      requiredProcesses: [],
    },
    {
      id: "nist-framework-id",
      name: "NIST",
      dateAdopted: "111111111",
      alerts: NISTAlerts,
      inputs: [],
      controls: NISTControls,
      requiredDocuments: [],
      requiredProcesses: [],
    },
  ],
};

export const frameworkSlice = createSlice({
  name: "framework",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newFramework: Framework }>) => {
      state.frameworks = [...state.frameworks, action.payload.newFramework];
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
