const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { checkIfUserExistsforSignUP, validateNewUserBody } = require("../middleware/signUpMiddleware");
const { checkIfUserExistsforLogin, checkPasswordMatch } = require("../middleware/loginMiddleware");
const { readAllUsersModel, addUserModel } = require("../models/userModels");
const { userSignUpSchema } = require("../schemas/userSignUpSchema")
const usersController = require("../controllers/usersController");

router.post( "/newuser",
  validateNewUserBody(userSignUpSchema) , // we are calling this function and inside it express will call;
// TODO: isPasswordMatch // 
checkIfUserExistsforSignUP, //express will call it;
// TODO: encrepthPassword // 
// TODO: usercontroler.signup // 
  async (req, res) => {
    try {
      // console.log("server got it from the front", req.body);
      const newUser = {
        ...req.body,
        type: "OrdinaryUser",
        profilePic: "",
        favorits: [],
        id: crypto.randomUUID(),
        date: new Date(),
      };
      //   delete newUser.confirmPassword;
      ///TODO: Add:await before "addPetModel"
      const userAdded = await addUserModel(newUser); //    מעביר לביצוע ולהכניס לשרת , אם זה קרה
      if (userAdded) {
        res.send(newUser);   //  וחיובי התוצאה משלחת לפרונט
        // res.send(req.body);  
      } 
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);


router.post( 
  "/login",
  checkIfUserExistsforLogin,
checkPasswordMatch,
  
  (req, res) => {
    try {

      res.send("user match with password");
      
      // res.send(200);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);






module.exports = router;











// router.post( "/login",
//   validateNewUserBody(loginSchema) , // we are calling this function and inside it express will call;
//   checkIfUserExists, //express will call it; or like yonatan  isexitingUser
//   TODO: verify Password
// 
//   async (req, res) => {
//     try {
//       const newUser = {
//         ...req.body,
//         type: "OrdinaryUser",
//         profilePic: "",
//         favorits: [],
//         id: crypto.randomUUID(),
//         date: new Date(),
//       };
//       const userAdded = await addUserModel(newUser);
//       if (userAdded) {
//         res.send(newUser);   
//       } 
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   }
// );

// (req, res, next) => {
//   console.log(" middleware");
//   next();
// },




// const {name, breed, color, height, weight, hypoallergnic, adoptionStatus } = req.body;
// const newPet = {
//     name: name,
//     breed: breed,
//     color: color,
//     height: height,
//     weight: weight,
//     hypoallergnic: hypoallergnic,
//     adoptionStatus: adoptionStatus,
//     id: uuidv4(),
//     date: new Date()
// }
