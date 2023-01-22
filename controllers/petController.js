const { addPetModel, readAllPetsModel, deletePetModel,GetSinglePet , GetPetsByType , ChangeOwnerId,getSavedPetsOfThisUser,changePetDetails,
  ChangeStatus, addSaveToList, GetPetsFromExtended, getForsterOrAdoptOfThisUser, removeFromList} = require("../models/petsModels");
const crypto = require("crypto");
 
function adoptPet (req, res) {
  const { petId } = req.params;
  const userId = req.body.userId;
  tryChangeToStatus(petId,'adopt')
    .then(async function() {
        await tryChangeOwnerId(petId,userId);
    })
    .then( async function() {
      res.send({ ok: true, added: petId });
    });
}

function fosterPet (req, res) {
  const { petId } = req.params;
  const userId = req.body.userId;
  tryChangeToStatus(petId,'fostered')
    .then(async function() {
        await tryChangeOwnerId(petId,userId);
    })
    .then( async function() {
      res.send({ ok: true, added: petId });
    });
}
 
function returnPet (req, res) {
  const { petId } = req.params;
  // const userId = req.body.userId;
  tryChangeToStatus(petId,'available')
    .then(async function() {
        await tryChangeOwnerId(petId,'');
    })
    .then( async function() {
      res.send({ ok: true, added: petId });
    });
}

async function tryChangeToStatus(petId,status ) {
    try{
    const adopted = await ChangeStatus(petId,status);
    if (adopted) { return adopted}
      // res.send({ ok: true, deletedId: petId });
    }catch (err) { res.status(500).send(err)};
};

async function tryChangeOwnerId(petId,userId) {
    try{
    const ownerChanged = await ChangeOwnerId(petId,userId);
    if (ownerChanged) { return ownerChanged  } 
    // res.send({ ok: true, deletedId: petId });
    }catch (err) { res.status(500).send(err)};
};

 

 


const savePet = async (req, res) => {
  console.log("444444444444444444444");
  try{
    const { petId } = req.params;
    const {userId} = req.query;

    // const userId = req.body.userId;
    //  const searchFor = req.body.searchFor
    // console.log("ddddddddddddddd",searchFor);
    const added = await addSaveToList(petId,userId);
    if (added) {
      res.send({ ok: true, added: petId });
      } 
    }catch (err) { res.status(500).send(err)};
};

const deleteSavedPet = async (req, res) => {
  try{
    const { petId } = req.params;
    const {userId} = req.query;
    const added = await removeFromList(petId,userId);
    if (added) {
      res.send({ ok: true, removed: petId });
      } 
    }catch (err) { res.status(500).send(err)};
};

async function deletePet(req, res) {
  try{
  const { petId } = req.params;
  const deleted = await deletePetModel(petId);
  if (deleted) {
    res.send({ ok: true, deletedId: petId });
    } 
  }catch (err) { res.status(500).send(err)};
};


async function getPet(req, res, next) {
  try{
  const { petId } = req.params;
  const getThePet = await GetSinglePet(petId);
  if (getThePet) {
    res.send(getThePet);
  }}catch (err) { 
    // res.status(500).send(err)
    err.statusCode = 500
    next(err);
  };
}


const addPet = async (req, res ,next) => {
  try {
    // req.file.path
    console.log("i get it from the front", req.body);
    const id = await addPetModel(req.body); //   אם זה קרה והוא החזיר  חיובי
    if (id) {
      const newPetWithId ={ ...req.body, id: id, } 
      res.send(newPetWithId);
    } 
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
    err.statusCode = 500
    next(err);
  }
};


async function editPet (req, res, next) {
 
  try{
   const { petId  } = req.params
   const changed = await changePetDetails(petId, req );
 console.log('changed',changed);
  if(changed){res.send({ok: true, newDeatails:changed})}
  }catch (err) { 
         res.status(500).send(err)
        // err.statusCode = 500
        // next(err);
    };
    }






 
//// start goood /////////
const getPets = async (req, res, next) => {

  if(req.query.search  === 'basic'){  //////// Basic search ///////////
  try{ 
  const petType = req.query.type
  const petTypeList = await GetPetsByType(petType);
  if (petTypeList) {
  res.send(petTypeList);   console.log(" ----petTypeList- ", petTypeList);  }
  }
  catch(err){res.status(500).send(err)
  err.statusCode = 500
  next(err);}
  }

  else if(req.query.search  === 'extended'){ //////// Extended search ///////////
  console.log("its Extended search ");
  const query = req.query
  const petFromExtended = await GetPetsFromExtended(query);
  if (petFromExtended) {
    res.send(petFromExtended);   console.log(" ----petFromExtended- ", petFromExtended);  }
  }

  else{ console.log("take it all" );  //////// get all search ///////////
  try {const allPets = await readAllPetsModel();
  if (allPets) { res.send(allPets);}  }
  catch(err){res.status(500).send(err)
    err.statusCode = 500
    next(err);}
  }}


 
const getUserPets = async (req, res ,next) => {
console.log("----------aaaaaaaaaaa-------------");
    const searchFor = req.query.searchFor  
    const { userId } = req.params;

if (searchFor === 'userSavedPets' ){
      try{
      const SavedPets = await getSavedPetsOfThisUser(userId);
      if (SavedPets) {
      res.send(SavedPets);
      } 
      }catch (err) { res.status(500).send(err)};}
 
else  {
      try{
      const ForsterOrAdoptOfThisUser = await getForsterOrAdoptOfThisUser(userId, searchFor);
      if (ForsterOrAdoptOfThisUser) {
      res.send(ForsterOrAdoptOfThisUser);
      } 
      }catch (err) { res.status(500).send(err)};}

      
    };
    



module.exports = { deletePet, addPet, adoptPet, fosterPet,returnPet,getUserPets,deleteSavedPet,editPet,

  getPet , savePet , getPets};







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