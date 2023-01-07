const { addPetModel, readAllPetsModel, deletePetModel, SearchExtended } = require("../models/petsModels");
const crypto = require("crypto");

async function deletePet(req, res) {
  const { petId } = req.params;
  const deleted = await deletePetModel(petId);
  console.log(deleted);
  if (deleted) {
    res.send({ ok: true, deletedId: petId });
  }
}

const addPet = async (req, res) => {
  try {
    console.log("i get it from the front", req.body);
    const id = await addPetModel(req.body); //   אם זה קרה והוא החזיר  חיובי
    if (id) {
      const newPetWithId ={
        ...req.body,
        id: id,
      } 
      res.send(newPetWithId);
    } //  החיה עם ה איי.די והתאריך תחזור לפרונט
    // res.send(req.body); // send it back to the front
    // res.send("another true"); // send it back to the front
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllpet = async (req, res) => {
  const reqQuery = req.query;

  try {
    console.log("got to get root");
    const allPets = await SearchExtended(req);
    // const allPets = readOnlySpecie(req);
    res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { deletePet, addPet, getAllpet };

// function addPet(req, res) {
//     const { petId } = req.params;
//     const deleted = deletePetModel(petId);
//     if (deleted) {
//       res.send({ ok: true, deletedId: petyId });
//     }
//   }


// const addPet = async (req, res) => {
//   try {
//     console.log("i get it from the front", req.body);
//     // const newPet = {
//     //   ...req.body,
//     //   id: crypto.randomUUID(),
//     //   date: new Date(),
//     // };
//     ///TODO: Add:await before "addPetModel"
//     const petAdded = await addPetModel(req.body); //   אם זה קרה והוא החזיר  חיובי
//     if (petAdded) {
//       res.send(req.body);
//     } //  החיה עם ה איי.די והתאריך תחזור לפרונט
//     res.send(req.body); // send it back to the front
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };