export interface signupParamsTypes {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface loginResponseTypes {
  fullName: string;
  username: string;
  _id: string;
  profilePic: string;
  token?: string;
}
