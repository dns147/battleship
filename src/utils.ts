import { DataRooms, DataWinners, RoomUsers } from "types";

const tableWinners: DataWinners[] = [];
const listRooms: DataRooms[] = []; 

export const updateRooms = (userName?: string): DataRooms[] => {
  if (userName) {
    const room: RoomUsers = {
      name: userName,
      index: listRooms.length,
    };

    listRooms.push({
      roomId: listRooms.length,
      roomUsers: [room],
    });
  }

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