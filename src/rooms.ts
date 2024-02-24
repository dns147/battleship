import { playersDB } from "players";
import { DataRooms, ReceivedData } from "types";
import { updateRooms } from "utils";
import { WebSocket } from "ws";

export const createRoom = (socket: WebSocket): void => {
  const userName = playersDB[playersDB.length - 1]?.name;
  const dataRooms: DataRooms[] = updateRooms(userName);

  const rooms: ReceivedData = {
    type: 'update_room',
    data: JSON.stringify(dataRooms),
    id: 0,
  };

  socket.send(JSON.stringify(rooms));
};