export interface SignUpRequest {
  memberId: string;
  memberPassword: string;
  confirmPassword: string;
  memberName: string;
  gender: string;
  birthday: string;
}

export interface LoginRequest {
  memberId: string;
  memberPassword: string;
}
