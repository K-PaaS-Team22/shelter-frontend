import { z } from "zod";
export const signUpSchema = z
  .object({
    memberId: z
      .string()
      .nonempty("아이디를 입력해주세요.")
      .min(8, "아이디는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]).+$/,
        "영문자와 특수문자를 모두 포함해야 합니다."
      ),
    memberPassword: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,}$/,
        "영문자와 숫자, 특수문자를 모두 포함해야 합니다."
      ),
    confirmPassword: z.string().nonempty("비밀번호 확인을 입력해주세요."),
    memberName: z.string().nonempty("이름을 입력해주세요."),
    gender: z.string().nonempty("성별을 선택해주세요."),
    birthday: z.string().nonempty("생년월일을 입력해주세요.")
  })
  .refine(data => data.memberPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "입력하신 비밀번호와 일치하지 않습니다."
  });
