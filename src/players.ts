import { playersDB } from "storage";
import { DataRooms, DataWinners, ReceivedData, RegPlayer, RegUser, DataPlayer } from "types";
import { updateRooms, updateWinners } from "utils";
import { WebSocket } from "ws";

export const regPlayer = (socket: WebSocket, receivedData: ReceivedData): void => {
  const receivedDataPlayer: DataPlayer = JSON.parse(receivedData.data);
  const userName: string = receivedDataPlayer.name;
  
  playersDB.push(receivedDataPlayer);

  console.log('playersDB', playersDB);

  const dataPlayer: RegUser = {
    name: userName,
    index: playersDB.length - 1,
    error: false,
    errorText: '',
  };

  const regDataPlayer: RegPlayer = {
    type: 'reg',
    data: JSON.stringify(dataPlayer),
    id: 0,
  };

  const dataRooms: DataRooms[] = updateRooms();

  const rooms: ReceivedData = {
    type: 'update_room',
    data: JSON.stringify(dataRooms),
    id: 0,
  };

  const dataWinners: DataWinners[] = updateWinners(userName);

  const winners: ReceivedData = {
    type: 'update_winners',
    data: JSON.stringify(dataWinners),
    id: 0,
  };

  socket.send(JSON.stringify(regDataPlayer));
  socket.send(JSON.stringify(rooms));
  socket.send(JSON.stringify(winners));
};
