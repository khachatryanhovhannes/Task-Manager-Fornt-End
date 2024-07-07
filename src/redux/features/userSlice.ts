import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models";
import {
  changePassword,
  changeUserinfo,
  getImage,
  getUserInfo,
  userLogin,
  userRegister,
} from "../thunks/userThunks";
import { Tokens } from "../../models";
import { deleteToken, setToken } from "../../helpers";

interface UserState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  isRegister: boolean;
  error: undefined | string | PayloadAction;
  isSaveChnages: boolean;
  imageSource: null | string;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
  isRegister: false,
  isSaveChnages: false,
  imageSource: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      deleteToken(Tokens.accessToken);
      deleteToken(Tokens.refreshToken);
    },
    clearIsRegister: (state) => {
      state.isRegister = false;
      state.isSaveChnages = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // ---------- User Registration ----------------
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state) => {
      state.isRegister = true;
      state.isLoading = false;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "something_wrong";
      }
    });

    // ---------- User Login -----------------------
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.error = "";
      setToken(Tokens.accessToken, action.payload.accessToken, true);
      setToken(Tokens.refreshToken, action.payload.refreshToken, true);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "something_wrong";
      }
    });

    // --------- Get User Info ----------------------
    builder.addCase(getUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // ----------- Change Password -------------------
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.isLoading = false;
      state.isSaveChnages = true;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "something_wrong";
      }
    });

    // ----------- Change more info ---------------
    builder.addCase(changeUserinfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeUserinfo.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isLoading = false;
      state.isSaveChnages = true;
    });
    builder.addCase(changeUserinfo.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "something_wrong";
      }
    });
    //
    builder.addCase(getImage.fulfilled, (state, action) => {
      state.imageSource = action.payload;
    });
  },
});

export const { logout, clearIsRegister } = userSlice.actions;

export default userSlice.reducer;
