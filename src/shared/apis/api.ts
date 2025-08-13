import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainerRef } from "@react-navigation/native";

const api = axios.create({ baseURL: "http://shelter.14-63-176-141.nip.io" });

let navigationRef: NavigationContainerRef<any> | null = null;
export const setNavigationRef = (nav: NavigationContainerRef<any>) => {
  navigationRef = nav;
};

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.trim()}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const errorCode = error.response?.data?.error?.errorCode;

    if (error.response?.status === 406 && errorCode === "EXPIRED_TOKEN") {
      console.warn("토큰 만료, 로그인 화면으로 이동");

      await AsyncStorage.removeItem("accessToken");

      if (navigationRef) {
        navigationRef.navigate("Login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
