import axios from "axios";
import { NavigationContainerRef } from "@react-navigation/native";

const api = axios.create({
  baseURL: "http://member.14-63-176-141.nip.io",
  withCredentials: true
});

let navigationRef: NavigationContainerRef<any> | null = null;
export const setNavigationRef = (nav: NavigationContainerRef<any>) => {
  navigationRef = nav;
};

api.interceptors.request.use(async config => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("세션 만료, 로그인 화면으로 이동");

      if (navigationRef) {
        navigationRef.navigate("Login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
