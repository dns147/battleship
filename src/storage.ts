import { DataPlayer, DataRooms, DataWinners } from "types";
import { WebSocket } from "ws";

export const playersDB: DataPlayer[] = [];

export const tableWinners: DataWinners[] = [];

export const listRooms: DataRooms[] = [];

export const wsStorage: WebSocket[] = [];
