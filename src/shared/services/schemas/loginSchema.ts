import z from "zod";
export const loginSchema = z.object({
  memberId: z.string().nonempty("아이디를 입력해주세요."),
  memberPassword: z.string().nonempty("비밀번호를 입력해주세요.")
});
