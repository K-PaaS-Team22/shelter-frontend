import { useMutation } from "@tanstack/react-query";
import { postSignUp, postLogin } from "@moeum/shared/apis";
import { SignUpRequest, LoginRequest } from "@moeum/shared/apis";

export const useSignUp = (onSuccess?: (data: unknown) => void) => {
  return useMutation<unknown, unknown, SignUpRequest>({
    mutationFn: (payload: SignUpRequest) => postSignUp(payload),
    onSuccess: (data: unknown) => {
      console.log("회원가입 성공");
      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      console.error("회원가입 실패:", error);
    }
  });
};

export const useLogin = (onSuccess?: (data: unknown) => void) => {
  return useMutation<unknown, unknown, LoginRequest>({
    mutationFn: (payload: LoginRequest) => postLogin(payload),
    onSuccess: (data: unknown) => {
      console.log("로그인 성공");
      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      console.error("로그인 실패:", error);
    }
  });
};
