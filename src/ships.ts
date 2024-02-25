import { playerShips } from "storage";
import { DataShips, GameDataShips, ReceivedData } from "types";
import { WebSocket } from "ws";

export const addShips = (socket: WebSocket, receivedData: ReceivedData): void => {
  const receivedDataPlayer: DataShips = JSON.parse(receivedData.data);

  playerShips.push({
    socket: socket,
    dataShips: receivedDataPlayer,
  });

  if (playerShips.length === 2) {
    playerShips.forEach((player) => {
      const gameDataShips: GameDataShips = {
        ships: player.dataShips.ships,
        currentPlayerIndex: player.dataShips.indexPlayer,
      } 

      const ships: ReceivedData = {
        type: 'start_game',
        data: JSON.stringify(gameDataShips),
        id: 0,
      };

      player.socket.send(JSON.stringify(ships));
    });
  }
};
