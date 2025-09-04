import api from "../../base";
import { SignUpRequest, LoginRequest } from "../../model";

export const postSignUp = (payload: SignUpRequest) => {
  return api.post("/members/save", payload);
};

export const postLogin = (payload: LoginRequest) => {
  return api.post("/members/login", payload);
};
