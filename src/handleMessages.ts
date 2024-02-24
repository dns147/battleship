import { regPlayer } from "players";
import { createRoom } from "rooms";
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
  
    default:
      break;
  }
}