//  ('/pets', petsRoute) מה שיגיע מ

const express = require("express");
const crypto = require("crypto");
// const {
//   TakeID,
//   ForEach,
//   addPetModel,
//   readThisId,
//   readAllPetsModel,
//   deletePetModel,
//   // readOnlySpecie,
//   // SearchExtended,
// } = require("../models/petsModels");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");
const { auth, AdminAuth}  = require ('../middleware/usersMiddleware')
const { isAlreadySaved}  = require ('../middleware/petsMiddleware')
const petsController = require("../controllers/petController");
const {upload, generateUrl} = require('../middleware/imageMiddleware');
// const { addPet } = require("../controllers/petController");
///TODO: Add: add validation middleware to POST and PUT
///TODO: Add:async after "router.post"

router.post("/",AdminAuth, upload.single('imageUrl'), generateUrl, petsController.addPet); //'picture' isthe name in the formdata

router.put("/:petId", AdminAuth, upload.single('imageUrl'), generateUrl, petsController.editPet);

router.get("/",    petsController.getPets);

router.get("/:petId",   petsController.getPet);

router.delete("/:petId",  auth, petsController.deletePet);

router.post("/:petId/adopt", auth, petsController.adoptPet);

router.post("/:petId/foster", auth, petsController.fosterPet);

router.post("/:petId/return", auth, petsController.returnPet); 

router.post("/:petId/save",auth,    isAlreadySaved, petsController.savePet);

router.delete("/:petId/save", auth,  petsController.deleteSavedPet);

router.get("/user/:userId", petsController.getUserPets); // get all your owned&saved pets

module.exports = router;

// router.post("/", (req, res) => {
//   try {
//     console.log("i get it from the front", req.body);
//     const newPet = {
//       ...req.body,
//       id: crypto.randomUUID(),
//       date: new Date(),
//     };
//     ///TODO: Add:await before "addPetModel"
//     const petAdded = addPetModel(newPet); //   אם זה קרה והוא החזיר  חיובי
//     if (petAdded) {
//       res.send(newPet);
//     } //  החיה עם ה איי.די והתאריך תחזור לפרונט
//     res.send(req.body); // send it back to the front
//    } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// if (Object.keys(reqQuery).length === 0 && reqQuery.constructor === Object){

//    try {console.log("2222222222" );
//   const allPets = readAllPetsModel();
//   res.send(allPets);
// } catch (err) { console.log("33333" );
//   console.log(err);
//   res.status(500).send(err);
// }
// }

// else {
//   try { console.log("44444" );
//     const SearchExtendedResults =  SearchExtended(req,res)
//     res.send( SearchExtendedResults);

//   } catch (err) { console.log("55555" );
//     console.log(err);
//     res.status(500).send(err);
//   }

// }

//  router.get("/Specie", (req, res) => {
//   try {
//     console.log("11111");
//     const allPets = readOnlySpecie(req);
//     res.send(allPets);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// router.get("/extendedSearch/:hight=:breed", (req, res) => {
//   try {

//     console.log("you got to extended search");
//     console.log(req.params);
//     res.send(req.params);
//     // const allPets = readOnlySpecie(req);
//     // res.send(allPets);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

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


// router.post("/ForEach", (req, res) => {
  //   try {
  //     console.log("ForEach");
  //     const petAdded = ForEach(req); //   אם זה קרה והוא החזיר  חיובי
  //     if (ForEach) {
  //       res.send("ssssss");
  //     }
  //     res.send(req.body); // send it back to the front
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   }
  // });