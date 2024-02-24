import { listRooms, playersDB, tableWinners } from "storage";
import { DataRooms, DataWinners, RoomUsers } from "types";

export const updateRooms = (userName?: string, indexRoom?: number): DataRooms[] => {
  if (userName && indexRoom === undefined) {
    listRooms.push({
      roomId: listRooms.length ? 0 : listRooms.length,
      roomUsers: [],
    });
  }

  if (userName && indexRoom !== undefined) {
    const room: RoomUsers = {
      name: userName,
      index: indexRoom,
    };

    listRooms.push({
      roomId: listRooms.length ? 0 : listRooms.length,
      roomUsers: [room],
    });

    console.log('indexRoom', indexRoom);

    listRooms.splice(indexRoom, 1);
  }

  console.log('listRooms', listRooms);

  return listRooms;
};

export const updateWinners = (userName: string): DataWinners[] => {
  if (tableWinners.length !== 0) {
    tableWinners.forEach((winners) => {
      if (winners.name === userName) {
        winners.wins += 1;
      } else {
        tableWinners.push({
          name: userName,
          wins: 0,
        });
      }
    });
  }

  return tableWinners;
};