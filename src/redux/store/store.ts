import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: userReducer,
  },
});
