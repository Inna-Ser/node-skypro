const http = require("http");
const { getUsers, getName } = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url.startsWith("/hello=")) {
    const name = decodeURIComponent(request.url.split("=")[1]);
    const userName = getName(name);
    if (userName) {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain, application/json";
      response.end(`Hello, ${userName}`);
    } else {
      response.status = 400;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain";
      response.end("Enter a name");
    }
    return;
  }

  if (request.url.startsWith("/")) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.end("Hello, world!");
  }

  response.status = 500;
  response.header = "Content-Type: text/plain";
  response.end("Server error");
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
