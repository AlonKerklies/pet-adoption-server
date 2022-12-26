const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const {
    readAllUsersModel,
    addUserModel,
  } = require("../models/userModels");



const usersController = require("../controllers/usersController");





router.post("/newuser", (req, res) => {
    try {
      console.log("server got it from the front", req.body);
      const newUser = {
        ...req.body,
        id: uuidv4(),
        date: new Date(),
      };
    //   delete newUser.confirmPassword;
      ///TODO: Add:await before "addPetModel"
      const userAdded = addUserModel(newUser); //   אם זה קרה והוא החזיר  חיובי
      if (userAdded) {
        res.send(newUser);
       
      } //  החיה עם ה איי.די והתאריך תחזור לפרונט
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
  
      res.send(req.body); // send it back to the front
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });


  module.exports = router;