const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { validateNewUserBody, isPasswordMatch, isNewUser, hashPassword , doesThisUserExistInSQL} = require("../middleware/usersMiddleware");
  const { userSignUpSchema } = require("../schemas/userSignUpSchema");
const UsersController = require("../controllers/UsersController");

 (req, res, next) => { console.log(" users Routes");  next();},  

router.post( "/signup", validateNewUserBody(userSignUpSchema), isPasswordMatch, isNewUser, hashPassword, UsersController.signup);

router.post( "/login", doesThisUserExistInSQL,  UsersController.login );
// checkIfUserExistsforLogin, 
//  checkPasswordMatch,
module.exports = router;






// async (req, res) => {
//   try {
//     // console.log("server got it from the front", req.body);
//     const newUser = {
//       ...req.body,
//       type: "OrdinaryUser",
//       profilePic: "",
//       favorits: [],
//       id: crypto.randomUUID(),
//       date: new Date(),
//     };
//     //   delete newUser.confirmPassword;
//     ///TODO: Add:await before "addPetModel"
//     const userAdded = await addUserModel(newUser); //    מעביר לביצוע ולהכניס לשרת , אם זה קרה
//     if (userAdded) {
//       res.send(newUser); //  וחיובי התוצאה משלחת לפרונט
//       // res.send(req.body);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// }


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
