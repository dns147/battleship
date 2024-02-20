import { Player, RegPlayer, RegUser } from "types";
import { WebSocket } from "ws";

const db: Player[] = []; 

const savePlayerInDB = (socket: WebSocket, message: string) => {
  const receivedData: Player = JSON.parse(message);
  
  db.push(receivedData);
  console.log(db);

  const dataPlayer: RegUser = {
    name: receivedData.data.name,
    index: 0,
    error: false,
    errorText: '',
  };

  const regDataPlayer: RegPlayer = {
    type: 'reg',
    data: JSON.stringify(dataPlayer),
    id: 0,
  };

  socket.send(JSON.stringify(regDataPlayer));
};

export {savePlayerInDB};