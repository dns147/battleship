import { listRooms, playersDB, wsStorage } from "storage";
import { DataGame, DataRooms, IndexRoom, ReceivedData } from "types";
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

  if (listRooms[0]?.roomUsers.length === 2) {
    const id = listRooms[0]?.roomUsers[0]?.index;

    const dataGame: DataGame = {
      idGame: indexRoom,
      idPlayer: id,
    }

    const game: ReceivedData = {
      type: 'create_game',
      data: JSON.stringify(dataGame),
      id: 0,
    };

    listRooms.forEach((room: DataRooms, idx: number) => {
      if (room.roomId === indexRoom) {
        listRooms.splice(idx, 1);
      }
    });

    wsStorage.forEach((client: WebSocket) => {
      client.send(JSON.stringify(game));

      const dataRooms: DataRooms[] = updateRooms();
      const rooms: ReceivedData = {
        type: 'update_room',
        data: JSON.stringify(dataRooms),
        id: 0,
      };

      client.send(JSON.stringify(rooms));
    });
  }
};