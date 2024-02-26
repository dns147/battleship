import { attack } from "attack";
import { regPlayer } from "players";
import { addUserToRoom, createRoom } from "rooms";
import { addShips } from "ships";
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

    case 'add_ships':
      addShips(socket, receivedData);
      break;

    case 'attack':
      attack(socket, receivedData);
      break;
  
    default:
      break;
  }
}