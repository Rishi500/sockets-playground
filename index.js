const WebSocketServer = require("websocket").server;
const http = require("http");

const httpServer = http.createServer((req, res) => {
  console.log("Received a request for", req.url);
});

const webSocket = new WebSocketServer({ httpServer });

webSocket.on("request", (req) => {
  const conn = req.accept();
  conn.on("message", (message) => {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
    }
  });
});

httpServer.listen(3000, () => {
  console.log("hello.. listening on port 3000");
});
