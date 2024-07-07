import axios from "axios";
import { BASE_URL } from "../constants";
import { Tokens } from "../models";
import { deleteToken, getToken, setToken } from "./../helpers";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const refresh_token = async (refreshToken: string | null) => {
  const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
    refreshToken,
  });
  return res;
};

instance.interceptors.request.use(
  function (config) {
    const accessToken = getToken(Tokens.accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    try {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getToken(Tokens.refreshToken);
        return refresh_token(refreshToken).then((response) => {
          setToken(Tokens.accessToken, response.data.data.accessToken, true);
          setToken(Tokens.refreshToken, response.data.data.refreshToken, true);
          originalRequest.headers.Authorization = `Bearer ${getToken(
            Tokens.accessToken
          )}`;
          return axios(originalRequest);
        });
      }
    } catch (error) {
      deleteToken(Tokens.accessToken);
      deleteToken(Tokens.refreshToken);
      location.pathname = "/signIn";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
