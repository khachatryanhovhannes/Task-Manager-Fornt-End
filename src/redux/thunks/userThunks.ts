import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/apiService";
import { IUserChangeData, IUserLogin, IUserRegister } from "../../models";
import axios from "axios";

const userRegister = createAsyncThunk(
  "auth/signup",
  async (newUserData: IUserRegister, { rejectWithValue }) => {
    try {
      const res = await instance.post("/auth/signup", newUserData);
      const data = res.data;
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const userLogin = createAsyncThunk(
  "auth/signin",
  async (userLoginData: IUserLogin, { rejectWithValue }) => {
    try {
      const res = await instance.post("/auth/signin", userLoginData);
      const data = await res.data;
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const getUserInfo = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get("/user/me");
      const data = await res.data;
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return Promise.reject("Something Wrong");
      }
    }
  }
);

const changeUserinfo = createAsyncThunk(
  "user/profilChange",
  async (newData: IUserChangeData, { rejectWithValue }) => {
    try {
      const res = await instance.patch("/user/me", newData);
      console.log(res)
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

const changePassword = createAsyncThunk(
  "user/changePassword",
  async (newPassword: string, { rejectWithValue }) => {
    try {
      const res = await instance.patch("/auth/password", { newPassword });
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

const getImage = createAsyncThunk(
  "user/getImage",
  async (path: string, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/files/${path}`, {
        responseType: "arraybuffer",
      });

      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return imageUrl;
    } catch (error) {
      return rejectWithValue("Failed to fetch image");
    }
  }
);

export default getImage;

export {
  getUserInfo,
  userLogin,
  userRegister,
  changeUserinfo,
  changePassword,
  getImage,
};
