import { configureStore } from "@reduxjs/toolkit";
import  anecdoteReducer from "./reducers/anecdoteReducer";
import filterSlice from "./reducers/filterSlice";
import notificationSlice from "./reducers/notificationSlice";


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterSlice,
        notification: notificationSlice, 
    }
});

export default store;