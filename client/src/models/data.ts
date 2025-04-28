export interface IToken {
  token: string;
}

export interface IPost {
  title: string;
  description: string;
  username: string;
  _id?: string;
}

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IAuthSliceState {
  isLoading: boolean;
  error: null | string;
  token: string | null;
}

export interface IPostSliceState {
  isLoading: boolean;
  error: null | string;
  posts: IPost[];
}
