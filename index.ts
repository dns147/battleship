// import { httpServer } from "./src/http_server/index";

// const HTTP_PORT = 8181;

// console.log(`Start static http server on the ${HTTP_PORT} port!`);
// httpServer.listen(HTTP_PORT);


import { WebSocketServer } from "ws";

export const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on('connection', (socket) => {
  console.log('Client connected');

  // Send a welcome message to the client
  //socket.send('Welcome to the WebSocket server!');

  // Listen for messages from the client
  socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
  });

  // Handle socket closure
  socket.on('close', () => {
      console.log('Client disconnected');
  });
});

console.log(`Start WebSocketServer on the 3000 port!`);