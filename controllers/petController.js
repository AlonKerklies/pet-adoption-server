const { addPetModel ,readAllPetsModel , deletePetModel ,  SearchExtended} = require("../models/petsModels");
const crypto = require("crypto");
 

function deletePet(req, res) {
  const { petId } = req.params;
  const deleted = deletePetModel(petId);
  if (deleted) {
    res.send({ ok: true, deletedId: petId });
  }
}

const addPet =  (req, res) => {
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
    res.send(req.body); // send it back to the front
   } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllpet = (req, res) => {
  const reqQuery = req.query

    try {
    console.log("got to get root");
    const allPets = SearchExtended(req);
    // const allPets = readOnlySpecie(req);
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
// function addPet(req, res) {
//     const { petId } = req.params;
//     const deleted = deletePetModel(petId);
//     if (deleted) {
//       res.send({ ok: true, deletedId: petyId });
//     }
//   }



  


module.exports = {deletePet , addPet, getAllpet}