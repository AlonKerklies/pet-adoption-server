const fs = require("fs"); // old connection to JSONfile
const path = require("path"); // old connection to JSONfile
const pathToPetsDB = path.resolve(__dirname, "../dataBase/petsDB.json"); // old connection to JSONfile
const dbConnection = require("../knex/knex"); // the new connect to SQL


//// start goood /////////
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

//// start goood /////////
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

async function GetSinglePet(petId) {
  console.log("GetSinglePet  - this is the id ", petId);
  try {
      const getedPet = await dbConnection.from('pets').where({id: petId}) 
    return getedPet;
  } catch (err) {
    console.log(err);
  }
}

//// start goood /////////
 const GetPetsByType = async (petType) => {
  console.log("this type", petType);
  try {
      const PetsByType = await dbConnection.from('pets').where({type: petType}) 
       console.log("PetsByType-----------234--------", PetsByType);
    return PetsByType;
  } catch (err) {
    console.log(err);
  }
}
//// start goood /////////
const GetPetsFromExtended = async (query) => {
  console.log('queryssssssssssssss',query);
  try {
  if (query.petName  !== 'all'){
    const PetsByQuery = await dbConnection.select('*')
    .from('pets')
    .where({ name: query.petName  })
 
    console.log('PetsByQuery1',PetsByQuery);
    return PetsByQuery;
  }
else{
  let petType = { type: query.type}
  if (query.type === 'all') {petType = {}}

  let adoptionStatus = { adoptionStatus: query.adoptionStatus}
  if (query.adoptionStatus === 'all') {adoptionStatus = {}}
  
  let minHight = '' ;  let maxHight = ''
      if (query.height === 'small') { minHight = 0;  maxHight = 20; }
  else if (query.height === 'medium') { minHight = 20;  maxHight = 40; }
  else if (query.height === 'big') { minHight = 40;  maxHight = 999; } 
  else    { minHight = 0;  maxHight = 999;   }

  let minWeight = '' ;  let maxWeight = ''
      if (query.weight === 'light') { minWeight = 0;  maxWeight = 15; }
  else if (query.weight === 'medium') { minWeight = 16;  maxWeight = 35; }
  else if (query.weight === 'heavy') { minWeight = 36;  maxWeight = 999; } 
  else    { minWeight = 0;  maxWeight = 999; }

  const PetsByQuery = await dbConnection.select('*')
  .from('pets')
  .where(petType)
  .andWhere(adoptionStatus)
  .andWhereBetween('height', [minHight,maxHight]).whereNotNull('height')
  .andWhereBetween('weight', [minWeight,maxWeight]).whereNotNull('weight')
  console.log('PetsByQuery2',PetsByQuery);
  return PetsByQuery;
}
}catch (err) {
  console.log(err);
}}


 
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

 
    async function addSaveToList(petId,userId) {
      try {
        console.log(" Save To List sql ","pet-",petId,"user-",userId );
        // const [id] = await dbConnection.from("pets").insert(newPet);
        const newSave ={pet_id:petId, user_id:userId };
         const add = await dbConnection.from('user_like_pet').insert(newSave); // this will signup the user
        return add;
      } catch (err) {
        console.log(err);
      }
    }

    async function removeFromList(petId,userId) {
      try { 
        console.log(" remove from List  ","pet-",petId,"user-",userId );
        // const [id] = await dbConnection.from("pets").insert(newPet);
        // knex('table_name').where({ pet_id: 3, user_id: 1 }).del();

          const removed = await dbConnection.from('user_like_pet').where({pet_id:petId, user_id:userId}).del();  
        return removed;
      } catch (err) {
        console.log(err);
      }
    }


    async function ChangeStatus(petId,status) {
      try {
        const changedToAdopted = await dbConnection.from('pets').where({id: petId}).update({adoptionStatus:status});  
        return changedToAdopted;
      } catch (err) {
        console.log(err);
      }
    }
    async function ChangeOwnerId(petId,userId) {
      try {
        const changedAdopter = await dbConnection.from('pets').where({id: petId}).update({currentOwnedByUserID: userId});  
        return ChangeOwnerId;
      } catch (err) {
        console.log(err);
      }
    }
   

      const getSavedPetsOfThisUser = async (userId) =>{
      try{
      // const userLikedPets = await dbConnection.from('user_like_pet').select('pet_id').where({user_id: userId})   // comeback undefined
        const userLikedPets = await dbConnection.from('user_like_pet')
        .select('pet_id')
        .where({user_id: userId})
        .join('pets', 'user_like_pet.pet_id', '=', 'pets.id')
        .select('pets.name', 'pets.breed', 'pets.adoptionStatus','pets.type', 'pets.id', 'pets.imageUrl' )  
        return userLikedPets;
      }catch(err){ 
      console.log(err);
      }}


      

      const getForsterOrAdoptOfThisUser = async (userId, searchFor) =>{
        console.log(" inside getForsterPetsOfThisUser " );
        console.log(" --------- searchFor ------" , searchFor );
        try{
        const userFosteredPets = await dbConnection.from('pets')
        .select('id','name','breed','imageUrl','type','adoptionStatus')
        .where({currentOwnedByUserID: userId})
        .andWhere({adoptionStatus: searchFor})  
          console.log(" userFosteredPets" , userFosteredPets);
          return userFosteredPets;
        }catch(err){ 
        console.log(err);
        }}

        async function changePetDetails(petId,req ) {
          const { name, breed ,color, height, weight, bio, hypoallergnic, adoptionStatus, dietaryRestrictions  } =  req.body
          try {
          const changedDetails = await dbConnection.from('pets')
          .where({id: petId})
          .update({name: name, breed: breed, color: color, height: height, weight: weight, bio: bio, hypoallergnic: hypoallergnic, adoptionStatus: adoptionStatus, dietaryRestrictions: dietaryRestrictions,  });  
          return changedDetails;
         } catch (err) {
           console.log(err);
         }
         }

module.exports = { readAllPetsModel, GetPetsFromExtended,  getSavedPetsOfThisUser, changePetDetails,
  addPetModel, getForsterOrAdoptOfThisUser,
  ChangeStatus, 
   deletePetModel, 
  ChangeOwnerId,
   GetPetsByType,
   readThisId, addSaveToList,
   removeFromList, 
    GetSinglePet ,
  };




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


