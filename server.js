const http = require("http");
const app = require("./app/app");

const port = process.env.PORT || 40200;

app.set("port", port); //configuracion del environment de express 
const server = http.createServer(app);

server.listen(port);
