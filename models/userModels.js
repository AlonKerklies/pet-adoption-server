const fs = require("fs");  // old connection to JSONfile
const path = require("path");  // old connection to JSONfile
// const pathToUserDB = path.resolve(__dirname, "../dataBase/usersDB.json"); // old connection to JSONfile
const dbConnection = require('../knex/knex') // the new cinnection to sql


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


const getUserByEmailModel = async (email) =>{
  console.log(" inside getUserByEmailModel " );
  try{
// const user = await dbConnection.from('users').where({email: email}); // comeback empty
const user = await dbConnection.from('users').where({email: email}).first();  // comeback undefined
return user
  }catch(err){
    console.log(err);

}}

async function GetSingleUser(userId) {
  console.log("GetSingleUser  - this is the id ", userId);
  try {
      const user = await dbConnection.from('users').where({id: userId})
      // .except('password') 
      user[0].password = '';
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function changeUserDetails(userId,req ) {

 try {
const {lastName,firstName,email,phone,bio} = req.body

 const changedDetails = await dbConnection.from('users')
 .where({id: userId})
 .update({firstName: firstName, lastName: lastName ,email:email, phone:phone, bio:bio });  
 return changedDetails;
} catch (err) {
  console.log(err);
}
}
 




const isEmailBelongToOther = async (email,userId) =>{
  console.log(" inside isEmailBelongToOther " );
  try{  
 const user = await dbConnection.from('users').where({email: email}).whereNot({id: userId});   

 return user
  }catch(err){
    console.log(err);

}
}





  module.exports = {   addUserModel,   getUserByEmailModel , GetSingleUser, isEmailBelongToOther , changeUserDetails };

/////// old
//   function doesThisUserExist  (userMail) {
//     const allUsers  = readAllUsersModel()
// const foundUser = allUsers.find(user => user.email === userMail)
// return foundUser;
//   };



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

  // async function  readAllUsersModel() {
//   try {
//     const userList = await dbConnection.from("users");
//     console.log("this is pet list", PetsList);
//     return userList;
//   } catch (err) {
//     console.log(err);
//   }
  
    // try {
    //   // console.log(pathToUserDB);
    //   const UsersList = fs.readFileSync(pathToUserDB);
    //   return JSON.parse(UsersList);
    // } catch (err) {
    //   console.log(err);
    // }
  // }
  
//   function doesThisPasswordMatchUser(email,password) {
//     const allUsers  = readAllUsersModel()
// const UserInSystem = allUsers.find(user => user.email = email)

// console.log("system pasword - ", UserInSystem.password);
// console.log("he send that - ", password);
// const isPasswordMatch = (password === UserInSystem.password)
// return isPasswordMatch;
//   };


