export type ILoginUser = {
  id: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  needPasswordChange: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
export type IPasswordData = {
  oldPassword: string;
  newPassword: string;
};
