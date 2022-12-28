//  ('/pets', petsRoute) מה שיגיע מ

const express = require("express");
const {
  TakeID,
  ForEach,
  addPetModel,
  readThisId,
  readAllPetsModel,
  deletePetModel,
  readOnlySpecie,
} = require("../models/petsModels");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const petsController = require("../controllers/petController");

///TODO: Add: add validation middleware to POST and PUT
///TODO: Add:async after "router.post"

router.post("/", (req, res) => {
  try {
    console.log("i get it from the front", req.body);
    const newPet = {
      ...req.body,
      id: crypto.randomUUID(),
      date: new Date(),
    };
    ///TODO: Add:await before "addPetModel"
    const petAdded = addPetModel(newPet); //   אם זה קרה והוא החזיר  חיובי
    if (petAdded) {
      res.send(newPet);
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

router.get("/", (req, res) => {
  try {
    const allPets = readAllPetsModel();
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:Specie", (req, res) => {
  try {
    const allPets = readOnlySpecie(req);
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/id/::petId", (req, res) => {
  try {
    const allPets = readThisId(req);
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:petId", petsController.deletePet);

// router.delete('/:petID', (req, res) => {
//     console.log("start del in server");
//     console.log(petID);
//     console.log(req.params.petID);
//     const {petID} = req.params;
//     res.send("hi from pets - get Id2")
//     const deleted = deletePetModel(petID)
//     if (deleted) {res.send({ok: true, deletedID:petID});}
// })

// router.get('/:petID', (req, res) => {
//     res.send("hi from pets - get Id")
// })

router.post("/ForEach", (req, res) => {
  try {
    const petAdded = ForEach(req); //   אם זה קרה והוא החזיר  חיובי
    if (ForEach) {
      res.send("ssssss");
    }
    res.send(req.body); // send it back to the front
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;


