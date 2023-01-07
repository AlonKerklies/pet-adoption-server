const fs = require("fs");  // old connection to JSONfile
const path = require("path");  // old connection to JSONfile
const pathToUserDB = path.resolve(__dirname, "../dataBase/usersDB.json"); // old connection to JSONfile
 
const dbConnection = require('../knex/knex') // the new cinnection to sql


function readAllUsersModel() {
    try {
      // console.log(pathToUserDB);
      const UsersList = fs.readFileSync(pathToUserDB);
      return JSON.parse(UsersList);
    } catch (err) {
      console.log(err);
    }
  }
  


async function addUserModel(newUser) {
    try {
      console.log("try insert this yo sql ",newUser );
      // const allUsers = readAllUsersModel(); allUsers.push(newUser); fs.writeFileSync(pathToUserDB, JSON.stringify(allUsers));
      const [id] = await dbConnection.from('users').insert(newUser); // this will signup the user
      console.log("come back from sql " ,id );
      return id;
    } catch (err) {
      console.log(err);
    }
  }


/////// old
  function doesThisUserExist  (userMail) {
    const allUsers  = readAllUsersModel()
const foundUser = allUsers.find(user => user.email === userMail)
return foundUser;
  };

  /////// new
const getUserByEmailModel = async (email) =>{
  console.log(" inside getUserByEmailModel " );
  try{
// const user = await dbConnection.from('users').where({email: email}); // comeback empty
const user = await dbConnection.from('users').where({email: email}).first();  // comeback undefined
 
 
return user
  }catch(err){
    console.log(err);

}}



//   function doesThisPasswordMatchUser(email,password) {
//     const allUsers  = readAllUsersModel()
// const UserInSystem = allUsers.find(user => user.email = email)

// console.log("system pasword - ", UserInSystem.password);
// console.log("he send that - ", password);
// const isPasswordMatch = (password === UserInSystem.password)
// return isPasswordMatch;
//   };



  module.exports = { readAllUsersModel, addUserModel, doesThisUserExist, getUserByEmailModel  };





  // function addUserModel(newUser) {
  //   try {
  //     ///TODO: Add:' await' before  readAllPetsModel"
  //     const allUsers = readAllUsersModel();
  //     allUsers.push(newUser);
  //     fs.writeFileSync(pathToUserDB, JSON.stringify(allUsers));
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

