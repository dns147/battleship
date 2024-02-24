import { listRooms, tableWinners } from "storage";
import { DataRooms, DataWinners, RoomUsers } from "types";

export const updateRooms = (userName?: string, indexRoom?: number): DataRooms[] => {
  if (userName && indexRoom === undefined) {
    listRooms.push({
      roomId: getRandomId(),
      roomUsers: [],
    });
  }

  if (userName && indexRoom !== undefined) {
    const currentRoom: RoomUsers = {
      name: userName,
      index: getRandomId(),
    };

    listRooms.forEach((room: DataRooms) => {
      const roomUsers: RoomUsers[] = room.roomUsers;

      if (room.roomId === indexRoom) {
        roomUsers.push(currentRoom);
      }
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

const min = 1;
const max = 100;
const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

export const getRandomId = (): number => {
  let id = 0;
  const random_number = Math.floor(Math.random() * (max - min)) + min;
  const indexNumber = numbers.indexOf(random_number);

  if (indexNumber !== -1) {
    id = random_number;
    numbers.splice(indexNumber, 1);
  }

  return id;
}