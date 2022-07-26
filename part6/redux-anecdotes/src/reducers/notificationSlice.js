import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null,
}; 

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {
            state.message = action.payload;
        },
        removeNotification(state) {
            state.message = null;
        },
    },
});
const {addNotification, removeNotification} = notificationSlice.actions;

let latestTimeoutID = null;
export const setNotification = (content, displayFor) => {
    return async dispatch => {
        dispatch(addNotification(content));
        clearTimeout(latestTimeoutID);
        latestTimeoutID = setTimeout(() => {
            dispatch(removeNotification());
        }, displayFor * 1000);
    };
};

export default notificationSlice.reducer;