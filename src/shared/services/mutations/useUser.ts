import { useMutation } from "@tanstack/react-query";
import { postSignUp, postLogin } from "@moeum/shared/apis";
import { SignUpRequest, LoginRequest } from "@moeum/shared/apis";

export const useSignUp = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (payload: SignUpRequest) => postSignUp(payload),
    onSuccess: () => {
      console.log("회원가입 성공");
      onSuccess?.();
    },
    onError: error => {
      console.error("회원가입 실패:", error);
    }
  });
};

export const useLogin = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => postLogin(payload),
    onSuccess: () => {
      console.log("로그인 성공");
      onSuccess?.();
    },
    onError: error => {
      console.error("로그인 실패:", error);
    }
  });
};
