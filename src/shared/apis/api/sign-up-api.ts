import api from "../base";
import { SignUpRequest } from "../model";

export const postSignUp = (payload: SignUpRequest) => {
  return api.post("/members/save");
};
