import { idPlayers, wsStorage } from "storage";
import { DataAttackBack, DataAttackFront, ReceivedData, WS } from "types";
import { WebSocket } from "ws";

export const attack = (socket: WebSocket, receivedData: ReceivedData): void => {
  const receivedDataPlayer: DataAttackFront = JSON.parse(receivedData.data);

  console.log(receivedDataPlayer);

  wsStorage.forEach((client: WS, idx: number) => {
    const currentPlayerId: number = receivedDataPlayer.indexPlayer;

    const dataAttack: DataAttackBack = {
      position: {
        x: receivedDataPlayer.x,
        y: receivedDataPlayer.y,
      },
      currentPlayer: currentPlayerId,
      status: 'miss',
    }

    const attack: ReceivedData = {
      type: 'attack',
      data: JSON.stringify(dataAttack),
      id: 0,
    };

    client.socket.send(JSON.stringify(attack));

    const nextIdTurn: number | undefined = idPlayers.filter(id => id !== currentPlayerId)[0];

    const turn: ReceivedData = {
      type: 'turn',
      data: JSON.stringify({
        currentPlayer: nextIdTurn,
      }),
      id: 0,
    };

    client.socket.send(JSON.stringify(turn));
  });
}
