export type ReceivedData = {
  type: string;
  data: string;
  id: number;
};

export type DataPlayer = {
  name: string;
  password: string;
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

export type DataWinners = {
  name: string;
  wins: number;
};

export type DataRooms = {
  roomId: number;
  roomUsers: RoomUsers[];
};

export type RoomUsers = {
  name: string;
  index: number;
};

export type UserToRoom = {
  type: string;
  data: string;
  id: number;
};

export type IndexRoom = {
  indexRoom: number,
};

export type DataGame = {
  idGame: number; 
  idPlayer: number | undefined;
};
