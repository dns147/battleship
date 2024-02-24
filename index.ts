import { handleMessages } from "handleMessages";
import { httpServer } from "http_server";
import { WebSocketServer } from "ws";

const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

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