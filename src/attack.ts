import { countMove, idPlayerShips, idPlayers, wsStorage } from "storage";
import { DataAttackBack, DataAttackFront, DataIdPlayerShips, Move, ReceivedData, Ships, WS } from "types";
import { WebSocket } from "ws";

export const attack = (socket: WebSocket, receivedData: ReceivedData): void => {
  const receivedDataPlayer: DataAttackFront = JSON.parse(receivedData.data);
  const attackCoord = {
    x: receivedDataPlayer.x,
    y: receivedDataPlayer.y,
  };

  const currentPlayerId: number = receivedDataPlayer.indexPlayer;

  countMove.forEach((move: Move) => {
    if (move.id === currentPlayerId) {
      move.count += 1;
    }
  });

  // const countId1: number | undefined = countMove[0]?.count;
  // const countId2: number | undefined = countMove[1]?.count;

  wsStorage.forEach((client: WS, idx: number) => {
    const currentShips: Ships[] | undefined = idPlayerShips.filter((ships: DataIdPlayerShips) => ships.idPlayer !== currentPlayerId)[0]?.ships;
    const nextIdTurn: number | undefined = idPlayers.filter(id => id !== currentPlayerId)[0];
    let currentStatus = '';

    currentShips?.some((ship: Ships) => {
      if (JSON.stringify(ship.position) === JSON.stringify(attackCoord)) {
        currentStatus = 'shot';
        return true;
      } else {
        currentStatus = 'miss';
      }
    });

    const dataAttack: DataAttackBack = {
      position: {
        x: receivedDataPlayer.x,
        y: receivedDataPlayer.y,
      },
      currentPlayer: currentPlayerId,
      status: currentStatus,
    }

    const attack: ReceivedData = {
      type: 'attack',
      data: JSON.stringify(dataAttack),
      id: 0,
    };

    // if (countId1 !== undefined && countId2 !== undefined) {
    //   if (Math.abs(countId1 - countId2) < 2) {
    //     client.socket.send(JSON.stringify(attack));
    //   }
    // }
    client.socket.send(JSON.stringify(attack));
    
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
