import { playersDB } from "storage";
import { DataRooms, IndexRoom, ReceivedData } from "types";
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

export const addUserToRoom = (socket: WebSocket, receivedData: ReceivedData): void => {
  const receivedDataPlayer: IndexRoom = JSON.parse(receivedData.data);
  const indexRoom: number = receivedDataPlayer.indexRoom;
  const userName = playersDB[indexRoom]?.name;
  const dataRooms: DataRooms[] = updateRooms(userName, indexRoom);

  const rooms: ReceivedData = {
    type: 'update_room',
    data: JSON.stringify(dataRooms),
    id: 0,
  };

  socket.send(JSON.stringify(rooms));
};