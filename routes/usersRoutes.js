const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { auth}  = require ('../middleware/usersMiddleware')
const { validateNewUserBody, isPasswordMatch, isNewUser, hashPassword , doesThisUserExistInSQL ,AdminAuth, isNewEmailAlredyExist} = require("../middleware/usersMiddleware");
const { userSignUpSchema } = require("../schemas/userSignUpSchema");
const UsersController = require("../controllers/UsersController");
 
//  (req, res, next) => {
// console.log(" users Routes"); 
//  next();},  


router.post( "/signup", validateNewUserBody(userSignUpSchema), isPasswordMatch, isNewUser, hashPassword, UsersController.signup);

router.post( "/login", doesThisUserExistInSQL, UsersController.login );

router.get("/",  AdminAuth, UsersController.readAllUsersModel);

router.get("/:userId/full", auth,  UsersController.getUser);

router.put("/:userId", auth,  validateNewUserBody(userSignUpSchema),  isNewEmailAlredyExist,  UsersController.updateUser);

module.exports = router;

