import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../models/interfaces";
import {
  addTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "../thunks/taskThunks";

interface ITasks {
  tasks: ITask[];
  isGeneralTasksLoading: boolean;
  error: string | undefined;
  allTasksCount: number;
  isTaskEventLoading: boolean;
  isTaskModify: boolean;
  taskEventError: string | undefined;
  eventPath: string;
  singleTask: ITask | null;
}

const initialState: ITasks = {
  tasks: [],
  eventPath: "",
  isGeneralTasksLoading: false,
  error: undefined,
  allTasksCount: 0,
  isTaskEventLoading: false,
  isTaskModify: false,
  taskEventError: undefined,
  singleTask: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTaskEvents: (state) => {
      state.isTaskEventLoading = false;
      state.isTaskModify = false;
      state.taskEventError = undefined;
      state.singleTask = null;
    },
  },
  extraReducers: (builder) => {
    // --------------- Get Tasks --------------------
    builder.addCase(getTasks.pending, (state) => {
      state.isGeneralTasksLoading = true;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isGeneralTasksLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "something_wrong";
      }
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.error = "";
      state.isGeneralTasksLoading = false;
      if (action.payload._meta) {
        state.allTasksCount = action.payload._meta.total;
      }
      state.tasks = action.payload.data;
      state.isTaskModify = false;
      state.taskEventError = undefined;
    });
    // --------------- Add Task ------------------
    builder.addCase(addTask.pending, (state) => {
      state.isTaskEventLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state) => {
      state.isTaskModify = true;
      state.isTaskEventLoading = false;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isTaskModify = false;
      state.isTaskEventLoading = false;
      if (typeof action.payload === "string") {
        state.taskEventError = action.error.message;
      } else {
        state.taskEventError = "something_wrong";
      }
    });
    // --------------- Edit Task --------------------
    builder.addCase(editTask.pending, (state) => {
      state.eventPath = "STATUS";
      state.isTaskEventLoading = true;
    });
    builder.addCase(editTask.fulfilled, (state) => {
      state.isTaskEventLoading = false;
      state.isTaskModify = true;
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.isTaskModify = false;
      state.isTaskEventLoading = false;
      if (typeof action.payload === "string") {
        state.taskEventError = action.error.message;
      } else {
        state.taskEventError = "something_wrong";
      }
    });
    // -------------- delete Task -------------------
    builder.addCase(deleteTask.pending, (state) => {
      state.eventPath = "DELETE";
      state.isTaskEventLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.isTaskEventLoading = false;
      state.isTaskModify = true;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isTaskModify = false;
      state.isTaskEventLoading = false;
      if (typeof action.payload === "string") {
        state.taskEventError = action.error.message;
      } else {
        state.taskEventError = "something_wrong";
      }
    });
    // -------------- get Task -------------------
    builder.addCase(getTask.pending, (state) => {
      state.singleTask = null;
      state.isGeneralTasksLoading = true;
    });
    builder.addCase(getTask.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.taskEventError = action.error.message;
      } else {
        state.taskEventError = "something_wrong";
      }
      state.isGeneralTasksLoading = false;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.singleTask = action.payload.data;
      state.isGeneralTasksLoading = false;
    });
  },
});

export const { clearTaskEvents } = tasksSlice.actions;

export default tasksSlice.reducer;
