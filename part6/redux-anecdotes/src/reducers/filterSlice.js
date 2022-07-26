import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterText: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addFilterText(state, action) {
            state.filterText = action.payload;
        },
    },
});
export const { addFilterText } = filterSlice.actions;
export default filterSlice.reducer;