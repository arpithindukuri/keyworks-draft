import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Tag {
	name: string;
	color: string;
	gradient: string;
}

export interface TodoState {
	tags: Tag[];
}

const initialState: TodoState = {
	tags: [
		{
			name: "school",
			color: "#ff5f2e",
			gradient: `linear-gradient(-30deg, #ff5f2e 30%, #FF7E33 90%)`,
		},
	],
};

export const tagSlice = createSlice({
	name: "tag",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<{ [key: string]: Tag }>) => {
			state.tags = { ...state.tags, ...action.payload };
		},
		remove: (state, action: PayloadAction<string>) => {
			const index = state.tags.findIndex(
				(tag) => tag.name === action.payload
			);
			state.tags.splice(index, 1);
		},
	},
});

export const { add, remove } = tagSlice.actions;

export const selectTagSlice = (state: RootState) => state.tag;
export const selectTags = (state: RootState) => state.tag.tags;

// export const selectTagByName = (name: string) =>
// 	createSelector(
// 		selectTagSlice,
// 		(tag) => tag.tags.find((t) => t.name === name) || tag.default
// 	);

export default tagSlice.reducer;
