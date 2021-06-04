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

export interface Input {
  name: string;
  status: "active" | "inactive";
}

export interface Control {
  id: string;
  isActive: boolean;
  description: string;
  severity: "low" | "medium" | "high";
  requiredDocuments?: RequiredDocument[];
  requiredProcesses?: RequiredProcess[];
  nestedControls?: Control[];
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
      id: "pci-framework-id",
      name: "PCI",
      dateAdopted: "111111111",
      alerts: PCIAlerts,
      controls: PCIControls,
    },
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

// export function getControlFromId(framework: Framework, controlId: string) {
//   if (!framework.controls) return undefined;

//   for (let i = 0; i < framework.controls.length; i++) {
//     const element = getControlFromIdHelper(framework.controls[i], controlId);
//     if (element) return element;
//   }

//   return undefined;
// }

// function getControlFromIdHelper(
//   control: Control,
//   controlId: string
// ): Control | undefined {
//   if (!control.nestedControls) return undefined;

//   if (control.id === controlId) return control;

//   for (let i = 0; i < control.nestedControls.length; i++) {
//     const element = getControlFromIdHelper(
//       control.nestedControls[i],
//       controlId
//     );
//     if (element) return element;
//   }

//   return undefined;
// }

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

export function recurseActiveControls(
  controls: Control[],
  predicate: (control: Control) => boolean
) {
  return controls
    .map((control) => control && countActiveControlsHelper(control, predicate))
    .reduce((prev, curr) => prev + curr, 0);
}

function countActiveControlsHelper(
  control: Control,
  predicate: (control: Control) => boolean
): number {
  console.log(control.id);

  let num = 0;

  if (control.nestedControls === undefined) num = predicate(control) ? 1 : 0;
  else
    num = control.nestedControls
      .map((nestedControl) =>
        countActiveControlsHelper(nestedControl, predicate)
      )
      .reduce((prev, curr) => prev + curr, 0);

  return num;
}
