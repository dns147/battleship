import WebSocket from "ws";

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
  index: number | null;
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
  index: number | null;
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

export type WS = {
  socket: WebSocket; 
  state: boolean | undefined;
};

export type DataShips = {
  gameId: number;
  ships: Ships[];
  indexPlayer: number;
};

export type Ships = {
  position: {
    x: number,
    y: number,
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type DataIdPlayerShips = {
  idPlayer: number | undefined,
  ships: Ships[] | undefined,
};

export type PlayerShips = {
  socket: WebSocket; 
  dataShips: DataShips;
};

export type GameDataShips = {
  ships: Ships[];
  currentPlayerIndex: number;
};

export type TurnPlayer = {
  type: string;
  data: string;
  id: number;
};

export type DataAttackBack = {
  position: {
    x: number,
    y: number,
  },
  currentPlayer: number | undefined;
  status: string;
};

export type DataAttackFront = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

// export type NextPlayer = {
//   id: number | undefined;
// }

export type Move = {
  id: number;
  count: number;
}

