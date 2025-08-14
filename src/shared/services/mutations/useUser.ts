import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "@moeum/shared/apis";
import { SignUpRequest } from "@moeum/shared/apis";

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
