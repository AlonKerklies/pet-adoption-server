const fs = require("fs");
const path = require("path");
const pathToUserDB = path.resolve(__dirname, "../dataBase/usersDB.json");


function readAllUsersModel() {
    try {
      console.log(pathToUserDB);
      const UsersList = fs.readFileSync(pathToUserDB);
      return JSON.parse(UsersList);
    } catch (err) {
      console.log(err);
    }
  }
  


function addUserModel(newUser) {
    try {
      ///TODO: Add:' await' before  readAllPetsModel"
      const allUsers = readAllUsersModel();
      allUsers.push(newUser);
      fs.writeFileSync(pathToUserDB, JSON.stringify(allUsers));
      return true;
    } catch (err) {
      console.log(err);
    }
  }


  module.exports = { readAllUsersModel, addUserModel  };
