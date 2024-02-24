import { handleMessages } from "handleMessages";
import { WebSocketServer } from "ws";

export const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for messages from the client
  socket.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    handleMessages(socket, message);
  });

  // Handle socket closure
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`Start WebSocketServer on the 3000 port!`);