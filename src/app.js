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

  if (request.url.startsWith("/hello =")) {
    const userId = parseInt(request.url.split("=")[1], 10);
    const userName = getName(userId);
    if (userName) {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain, application/json";
      response.write(`Hello, ${userName}`);
    } else {
      response.status = 400;
      response.header = "Content-Type: text/plain";
      response.write("Enter a name");
    }
    response.end();
    return;
  }

  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, world!")
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
