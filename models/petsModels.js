const fs = require("fs"); // old connection to JSONfile
const path = require("path"); // old connection to JSONfile
const pathToPetsDB = path.resolve(__dirname, "../dataBase/petsDB.json"); // old connection to JSONfile
const dbConnection = require("../knex/knex"); // the new connect to SQL

async function readAllPetsModel() {
  try {
    const PetsList = await dbConnection.from("pets");
    // const PetsList = fs.readFileSync(pathToPetsDB);//old way to FS
    console.log("this is pet list", PetsList);
    //  return JSON.parse(PetsList); // old way with FS
    return PetsList;
  } catch (err) {
    console.log(err);
  }
}


function readOnlySpecie(req, res) {
  try {
    const { Specie } = req.params;
    const allPets = readAllPetsModel();
    //  const updatedArray = allPets.filter((cccc) => cccc.type  == "Dog");
    const updatedArray = allPets.filter((cccc) => cccc.type == Specie);
    return updatedArray;
  } catch (err) {
    console.log(err);
  }
}

function SearchExtended(req, res) {
  const reqQuery = req.query;
  console.log("got to SearchExtended");
  console.log("reqQuery", reqQuery);

  // check it there a vakue in the neme key
  if (reqQuery.petName === "") {
    console.log(" petName is empty");
  } else {
    console.log("petName has a value", reqQuery.petName);
  }

  // delete every key that have no value
  const reqQueryClean = { ...reqQuery };
  for (const key in reqQueryClean) {
    if (
      reqQueryClean[key] === undefined ||
      reqQueryClean[key] === null ||
      reqQueryClean[key] === ""
    ) {
      delete reqQueryClean[key];
    }
  }

  console.log("this is reqQueryClean type", reqQueryClean.type); //
  const allPets = readAllPetsModel();
 
  return allPets;

}

function readThisId(req, res) {
  try {
    const { petId } = req.params;
    const allPets = readAllPetsModel();
    const onlyThisId = allPets.filter((cccc) => cccc.id == petId);
    return onlyThisId;
  } catch (err) {
    console.log(err);
  }
}



async function addPetModel(newPet) {
  try {
    const [id] = await dbConnection.from("pets").insert(newPet); // האיידי חוזר כרשימה עם פריט אחד
    console.log("this is the new id - ", id);
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  console.log("this is the id ", petId);
  try {
    const deleted = await dbConnection.from('pets').where({id: petId}).del()
    return deleted;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllPetsModel,  addPetModel,  deletePetModel, readOnlySpecie,  readThisId, SearchExtended };




// function deletePetModel(petId) {
//   try {
//     console.log("this is the id    ", petId);
//     const idString = JSON.stringify(petId);
//     const idparse = JSON.parse(petId);
//     console.log("idString", idString);
//     console.log("idparse", idparse);
//     console.log("petId", petId);
//     console.log("[petId]", [petId]);
//     console.log("{petId} ", { petId });
//     const allPets = readAllPetsModel();
//     console.log("allPets.length   ", allPets.length);
//     const updatedArray = allPets.filter((pet) => pet.id !== idparse);
//     console.log("updatedArray.length  ", updatedArray.length);
//     fs.writeFileSync(pathToPetsDB, JSON.stringify(updatedArray));

//     return true;
//   } catch (err) {
//     console.log(err);
//   }
// }   

 //  const updatedArray = allPets.filter((cccc) => cccc.type  ==   reqQueryClean.type  );
  //  console.log("this is updatedArray", updatedArray) //
  //     return  updatedArray ;
  //   allKeys = Object.keys(reqQuery)
  //   console.log( allKeys );
  //   const hasValue = Object.keys(reqQuery).find(key=> (reqQuery[key] === '' ||
  //   reqQuery[key] === null));
  // console.log( hasValue, "has no value");

  //   function isEmpty(reqQuery) {

  // }

///TODO: Add:' await' before  readAllPetsModel"
    // const allPets = readAllPetsModel(); // old with fs
    // allPets.push(newPet); // old with fs
    // fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets)); // old with fs



    ///TODO: Add:' async' before  function"

// function ForEach() {
//   try {
//     const allPets = readAllPetsModel();
//     allPets.forEach((item, i) => {
//       item.image =
//         "https://upload.wikimedia.org/wikipedia/commons/9/99/Brooks_Chase_Ranger_of_Jolly_Dogs_Jack_Russell.jpg";
//     });

//     fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets));
//     return true;
//   } catch (err) {
//     console.log(err);
//   }
// }