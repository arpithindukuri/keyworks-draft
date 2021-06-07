import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISOAlerts, ISOControls } from "../data/ISOData";
import { NISTAlerts, NISTControls } from "../data/NISTData";
import { PCIAlerts, PCIControls } from "../data/PCIData";
import { RootState } from "./store";

export interface Alert {
  title: string;
  child: JSX.Element;
  timestamp: string;
  severity: "error" | "info" | "success" | "warning";
  dismissalMessageChild?: JSX.Element;
}

export interface DataItem {
  name: string;
  type: "checkbox" | "number";
  value: boolean | number;
}

export interface Control {
  id: string;
  isActive: boolean;
  description: string;
  severity: "low" | "medium" | "high";
  requiredDocuments?: RequiredDocument[];
  requiredProcesses?: RequiredProcess[];
  nestedControls?: Control[];
  dataItems?: DataItem[];
  compliance?: number;
}

export interface RequiredDocument {
  name: string;
  document?: Document;
}

export interface Document {
  id: string;
  name: string;
  dateUploaded: string;
  link: string;
  status: "in-effect" | "needs-review" | "out-of-date";
}

export interface RequiredProcess {
  name: string;
  description?: string;
  link?: string;
  process?: Process;
}

export interface Process {
  id: string;
  name: string;
  dateUploaded: string;
  link: string;
  status: "in-effect" | "needs-review" | "out-of-date";
}

export interface AvailableFramework {
  id: string;
  name: string;
  link: string;
}

export interface Framework {
  id: string;
  name: string;
  dateAdopted: string;
  alerts: Alert[];
  controls: Control[];
}

export interface FrameworkState {
  frameworks: Framework[];
}

const initialState: FrameworkState = {
  frameworks: [
    {
      id: "iso27001-framework-id",
      name: "ISO27001",
      dateAdopted: "111111111",
      alerts: ISOAlerts,
      controls: ISOControls,
    },
    {
      id: "nist-framework-id",
      name: "NIST",
      dateAdopted: "111111111",
      alerts: NISTAlerts,
      controls: NISTControls,
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
    updateControl: (
      state,
      action: PayloadAction<{
        frameworkId: string;
        controlId: string;
        newControl: Control;
      }>
    ) => {
      const index = state.frameworks.findIndex(
        (frame) => frame.id === action.payload.frameworkId
      );

      if (index > -1 && state.frameworks[index]) {
        const replaceControl = (control: Control): Control => {
          if (control.id === action.payload.controlId)
            return action.payload.newControl;

          const result: Control =
            control.nestedControls !== undefined
              ? {
                  ...control,
                  nestedControls: control.nestedControls.map((item) =>
                    replaceControl(item)
                  ),
                }
              : control;

          return result;
        };

        for (let i = 0; i < state.frameworks[index].controls.length; i++) {
          state.frameworks[index].controls[i] = replaceControl(
            state.frameworks[index].controls[i]
          );
        }
      }
    },
  },
});

export const { add, remove, updateControl } = frameworkSlice.actions;

export const selectFrameworkSlice = (state: RootState) => state.framework;
export const selectFrameworks = (state: RootState) =>
  state.framework.frameworks;

export const selectFrameworkById = (id: string) =>
  createSelector(selectFrameworks, (frameworks) =>
    frameworks.find((frame) => frame.id === id)
  );

export default frameworkSlice.reducer;

// ------------- HELPER FUNCTIONS --------------

export function countActiveControls(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countActiveControlsHelper(element);
  }
  return result;
}
function countActiveControlsHelper(control: Control): number {
  if (control.nestedControls === undefined) return control.isActive ? 1 : 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countActiveControlsHelper(element);
  }
  return result;
}

export function countAllControls(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countAllControlsHelper(element);
  }
  return result;
}
function countAllControlsHelper(control: Control): number {
  if (control.nestedControls === undefined) return 1;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countAllControlsHelper(element);
  }
  return result;
}

export function countActiveControlDocuments(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countActiveControlDocumentsHelper(element);
  }
  return result;
}
function countActiveControlDocumentsHelper(control: Control): number {
  if (!control.isActive) return 0;

  if (control.requiredDocuments !== undefined)
    return control.requiredDocuments.length;

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countActiveControlDocumentsHelper(element);
  }
  return result;
}

export function countValidControlDocuments(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countValidControlDocumentsHelper(element);
  }
  return result;
}
function countValidControlDocumentsHelper(control: Control): number {
  if (!control.isActive) return 0;

  if (control.requiredDocuments !== undefined) {
    let result = 0;
    for (let i = 0; i < control.requiredDocuments.length; i++) {
      const element = control.requiredDocuments[i];
      if (element.document !== undefined) result += 1;
    }
    return result;
  }

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countValidControlDocumentsHelper(element);
  }
  return result;
}

export function countActiveControlProcesses(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countActiveControlProcessesHelper(element);
  }
  return result;
}
function countActiveControlProcessesHelper(control: Control): number {
  if (!control.isActive) return 0;

  if (control.requiredProcesses !== undefined)
    return control.requiredProcesses.length;

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countActiveControlProcessesHelper(element);
  }
  return result;
}

export function countValidControlProcesses(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countValidControlProcessesHelper(element);
  }
  return result;
}
function countValidControlProcessesHelper(control: Control): number {
  if (!control.isActive) return 0;

  if (control.requiredProcesses !== undefined) {
    let result = 0;
    for (let i = 0; i < control.requiredProcesses.length; i++) {
      const element = control.requiredProcesses[i];
      if (element.process !== undefined) result += 1;
    }
    return result;
  }

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countValidControlProcessesHelper(element);
  }
  return result;
}

export function getControlsCompliance(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += getControlsComplianceHelper(element);
  }
  return result / controls.length;
}
function getControlsComplianceHelper(control: Control): number {
  if (control.compliance !== undefined) {
    return control.compliance;
  }

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += getControlsComplianceHelper(element);
  }
  return result / control.nestedControls.length;
}

export function countCompliantControls(controls: Control[]) {
  let result = 0;
  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    result += countCompliantControlsHelper(element);
  }
  return result;
}
function countCompliantControlsHelper(control: Control): number {
  if (!control.isActive) return 0;

  if (control.compliance !== undefined) return control.compliance === 1 ? 1 : 0;

  if (control.nestedControls === undefined) return 0;

  let result = 0;
  for (let i = 0; i < control.nestedControls.length; i++) {
    const element = control.nestedControls[i];
    result += countCompliantControlsHelper(element);
  }
  return result;
}
