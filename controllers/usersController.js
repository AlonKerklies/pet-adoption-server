const crypto = require("crypto");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {   addUserModel , GetSingleUser, changeUserDetails} = require("../models/userModels");
const dbConnection = require("../knex/knex"); // the new connect to SQL



async function getUser (req, res, next) {
try{
  const userId = req.params['userId'] 
  console.log("req.params['userId'] ", userId )
 const getTheUser = await GetSingleUser(userId);
 console.log(getTheUser);
if(getTheUser){res.send(getTheUser);}
}catch (err) { 
      // res.status(500).send(err)
      err.statusCode = 500
      next(err);
    };
  }
  
  async function updateUser (req, res, next) {

    console.log('updateUser');
    try{
    const userId = req.params['userId'] 
     const changed = await changeUserDetails(userId, req );
     console.log('changed',changed);
     if(changed){res.send({ok: true, newDeatails:changed})}
    }catch (err) { 
           res.status(500).send(err)
          // err.statusCode = 500
          // next(err);
      };
      }
 




async function  readAllUsersModel(req, res ,next) {
    try {
      const userList = await dbConnection.from("users").select('id','email','firstName','lastName','type','phone');
      console.log("this is the userList", userList);
      res.send(userList);
    } catch (err) {
      console.log(err);
      err.statusCode = 500
      next(err);
        }}



const signup = async (req, res, next) => {
  console.log("finally the last station signup");
  try {
    console.log("what u get so far ", req.body);
    const { firstName, lastName, email, phone, password } = req.body;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      type: "OrdinaryUser",
      profilePic: "",
      bio: "",
    };

    const userAdded = await addUserModel(newUser); //    מעביר לביצוע ולהכניס לשרת , אם זה קרה
    res.send({ userId: userAdded, ok: true }); //  וחיובי התוצאה משלחת לפרונט
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
    err.statusCode = 500
    next(err);
  }
};

const login = async (req, res, next) => {
  console.log("----------- login -----------");
  const { password, hashPssword, id, user } = req.body;
  // console.log("user.firstName ", user.firstName, "id ", user.id);
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send("Password incorrect");
      } else {
        const token = jwt.sign(
          { id: user.id, type: user.type },
          process.env.TOKEN_SECRET,
          { expiresIn: "2d" }
        );

        res.cookie("token", token, { maxAge: 86000000, httpOnly: true });
        res.cookie("firstName", user.firstName, {
          maxAge: 86000000,
          httpOnly: true,
        });
        res.send({
          ok: true,
          token: token,
          firstName: user.firstName,
          id: user.id,
          type: user.type,
        });
      }
    });
  } catch (err) {
    err.statusCode = 500
    next(err);
    // res.status(500).send(err);
  }
};
    



module.exports = { signup ,login ,readAllUsersModel, getUser ,updateUser };


 