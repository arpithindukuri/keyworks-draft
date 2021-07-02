import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import userData from "../data/UserData.json";

export type Role =
  | "Administrator"
  | "Security Team"
  | "C-Level"
  | "VP-Level"
  | "Director"
  | "Manager"
  | "Analyst"
  | "Frontline"
  | "Regulatory Reporting"
  | "Compliance Reporting"
  | "Audit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  start: string;
  end: string;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: userData.map((item) => ({ ...item, role: item.role as Role })),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ newUser: User }>) => {
      state.users = [...state.users, action.payload.newUser];
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index > -1) state.users.splice(index, 1);
    },
    update: (state, action: PayloadAction<{ id: string; newUser: User }>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index > -1) state.users[index] = action.payload.newUser;
    },
  },
});

export const { add, remove, update } = userSlice.actions;

export const selectUserSlice = (state: RootState) => state.user;
export const selectUsers = (state: RootState) => state.user.users;

// export const selectDashboardById = (id: string) =>
//   createSelector(selectDashboardSlice, (dashboard) =>
//     dashboard.dashboards.find((dash) => dash.id === id)
//   );

export default userSlice.reducer;
