const fs = require("fs");
const path = require("path");
const pathToPetsDB = path.resolve(__dirname, "../dataBase/petsDB.json");

function readAllPetsModel() {
  try {
    console.log(pathToPetsDB);
    const PetsList = fs.readFileSync(pathToPetsDB);
    return JSON.parse(PetsList);
  } catch (err) {
    console.log(err);
  }
}




function readOnlySpecie( req, res  ) {
  try {
    const    {Specie }   = req.params;
    const allPets = readAllPetsModel();
  //  const updatedArray = allPets.filter((cccc) => cccc.type  == "Dog");
 const updatedArray = allPets.filter((cccc) => cccc.type  ==   Specie  );
    return  updatedArray ;
  } catch (err) {
    console.log(err);
  }
}

function readThisId( req, res  ) {
  try {
    const { petId }  = req.params;
    const allPets = readAllPetsModel();
 const onlyThisId = allPets.filter((cccc) => cccc.id  ==   petId  );
    return  onlyThisId ;
  } catch (err) {
    console.log(err);
  }
}



///TODO: Add:' async' before  function"


 
function ForEach() {
  try {
     const allPets = readAllPetsModel();
    allPets.forEach((item, i) => {
      item.image = "https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg";
    });
     
    fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets));
    return true;
  } catch (err) {
    console.log(err);
  }
}



function addPetModel(newPet) {
  try {
    ///TODO: Add:' await' before  readAllPetsModel"
    const allPets = readAllPetsModel();
    allPets.push(newPet);
    fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets));
    return true;
  } catch (err) {
    console.log(err);
  }
}

function deletePetModel(petId) {
  try {
    console.log("deletePetModel   " )
    const allPets = readAllPetsModel();
     const updatedArray = allPets.filter((pet) => pet.id !== petId);
 
    fs.writeFileSync(pathToPetsDB, JSON.stringify(updatedArray));
 
    return true;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPetsModel, addPetModel, deletePetModel, readOnlySpecie, ForEach, readThisId };
