const fs = require("fs");
const path = require("path");

const getUsers = () => {
  const filePath = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(filePath, "utf-8");
};

const getName = (name) => {
  const filePath = path.join(__dirname, "../data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const user = users.find((user) => user.name.toLowerCase() === name.toLowerCase());
  return user ? user.name : null;
};

module.exports = { getUsers, getName };
