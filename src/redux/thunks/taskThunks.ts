import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiService";
import { IAddTask, IGetTasksParapms, IEditTask } from "../../models";
import axios from "axios";

const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (
    { take, skip, date, status }: IGetTasksParapms,
    { rejectWithValue }
  ) => {
    try {
      const dueDate = date ? `&dueDate=${date}` : "";
      const statusType = status ? `&status=${status}` : "";
      const res = await instance.get(
        `/task?take=${take}&skip=${skip}${dueDate}${statusType}`
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: IAddTask, { rejectWithValue }) => {
    try {
      console.log(task);
      const res = await instance.post("/task", task);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ id, task }: IEditTask, { rejectWithValue }) => {
    try {
      const res = await instance.patch(`task/${id}`, task);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await instance.delete(`/task/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await instance.get(`task/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

export { getTasks, addTask, editTask, deleteTask, getTask };
