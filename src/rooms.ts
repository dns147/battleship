import { idPlayers, listRooms, playersDB, wsStorage } from "storage";
import { DataGame, DataRooms, IndexRoom, ReceivedData, WS } from "types";
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
  const userName = playersDB[playersDB.length - 1]?.name;
  const dataRooms: DataRooms[] = updateRooms(userName, indexRoom);

  const rooms: ReceivedData = {
    type: 'update_room',
    data: JSON.stringify(dataRooms),
    id: 0,
  };

  socket.send(JSON.stringify(rooms));

  if (wsStorage.length === 2) {
    listRooms.forEach((room: DataRooms, idx: number) => {
      if (room.roomId === indexRoom) {
        listRooms.splice(idx, 1);
      }
    });

    wsStorage.forEach((client: WS, idx: number) => {
      const dataGame: DataGame = {
        idGame: indexRoom,
        idPlayer: idPlayers[idx],
      }
  
      const game: ReceivedData = {
        type: 'create_game',
        data: JSON.stringify(dataGame),
        id: 0,
      };

      client.socket.send(JSON.stringify(game));

      const dataRooms: DataRooms[] = updateRooms();
      const rooms: ReceivedData = {
        type: 'update_room',
        data: JSON.stringify(dataRooms),
        id: 0,
      };

      client.socket.send(JSON.stringify(rooms));
    });
  }
};