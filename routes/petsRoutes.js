//  ('/pets', petsRoute) מה שיגיע מ

const express = require("express");
const crypto = require("crypto");
const router = express.Router();
 
const { auth, AdminAuth}  = require ('../middleware/usersMiddleware')
const { isAlreadySaved}  = require ('../middleware/petsMiddleware')
const petsController = require("../controllers/petController");
const {upload, generateUrl} = require('../middleware/imageMiddleware');
 
router.post("/",AdminAuth, upload.single('imageUrl'), generateUrl, petsController.addPet); //'picture' isthe name in the formdata

router.put("/:petId", AdminAuth,   petsController.editPet);

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
 