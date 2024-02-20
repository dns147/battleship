export type Player = {
  type: string;
  data: User;
  id: number;
};

type User = {
  name: string;
  password: string;
  id: number;
};

export type RegPlayer = {
  type: string;
  data: string;
  id: number;
};

export type RegUser = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};
