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

export interface AddMediaDataTypes {
  id: string;
  original_title?: string;
  name?: string;
  title?: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export interface AddMediaResponse extends AddMediaDataTypes {
  createdAt: string;
  _id: string;
  Index: number;
}
