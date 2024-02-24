import { regPlayer } from "players";
import { addUserToRoom, createRoom } from "rooms";
import { ReceivedData } from "types";
import { WebSocket } from "ws";

export const handleMessages = (socket: WebSocket, message: string) => {
  const receivedData: ReceivedData = JSON.parse(message);

  switch (receivedData.type) {
    case 'reg':
      regPlayer(socket, receivedData);
      break;

    case 'create_room':
      createRoom(socket);
      break;

    case 'add_user_to_room':
      addUserToRoom(socket, receivedData);
      break;
  
    default:
      break;
  }
}