const http = require("http");
const { getUsers, getName } = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url.startsWith("/?hello=")) {
    const name = decodeURIComponent(request.url.split("=")[1]);
    const userName = getName(name);
    if (userName) {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader = "Content-Type: text/plain, application/json";
      response.end(`Hello, ${userName}`);
    } else {
      response.statusCode = 400;
      response.statusMessage = "OK";
      response.setHeader = "Content-Type: text/plain";
      response.end("Enter a correct name");
    }
    return;
  }
  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader = "Content-Type: text/plain";
    response.end("Hello, world!");
    return;
  } else {
    response.statusCode = 500;
    response.statusMessage = "Bad request";
    response.setHeader = "Content-Type: text/plain";
    response.end("Server error");
    return;
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
