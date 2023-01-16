 
const Ajv = require("ajv");
const ajv = new Ajv();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetPetsByType,  }  = require ("../models/petsModels");
const dbConnection = require('../knex/knex') // the new cinnection to sql
 
const isAlreadySaved = async (req, res, next) => {
  console.log("------isAlreadySaved------www-----" );



  const { petId } = req.params;
  // const userId = req.body.userId;
  const {userId} = req.query;
 const {check} = req.query;
 console.log("------isAlreadySaved------www-----" );
 if (check === 'check'){
  const Liked = await dbConnection.from('user_like_pet')
  .where({pet_id: petId})
  .andWhere({user_id: userId}).first();   
  if (Liked) { // for back empty undefined  
    console.log("there is like for this pet" );
    // const err = new Error("this email already exists in this application")
    // err.statusCode = 400
    // next(err);
    res.send("already liked");return }
     else{res.send("not liked");return}
  }

  if (check === 'saveUnsave'){
    const Liked = await dbConnection.from('user_like_pet')
    .where({pet_id: petId})
    .andWhere({user_id: userId}).first();   
    if (Liked) { // for back empty undefined  
      console.log("there is like for this pet" );
      // const err = new Error("this email already exists in this application")
      // err.statusCode = 400
      // next(err);
      res.send("already liked");return }
       else{next()}
    }

 




    // const Liked = await dbConnection.from('user_like_pet')
    // .where({pet_id: petId})
    // .andWhere({user_id: userId}).first();   
    // if (Liked) { // for back empty undefined  
    //   console.log("there is like for this pet", Liked);
    //   // const err = new Error("this email already exists in this application")
    //   // err.statusCode = 400
    //   // next(err);
    //    return;
    // }
    // // next()
  };






module.exports = {  isAlreadySaved  };
 













// const checkBasicExtended = (req, res, next) => {
// console.log("------go to checkBasicExtended----");
// if(req.query.search  === 'basic'){  
//     try{
//     const petTypeList =  GetPetsByType(req.query.type);
//     res.send({petTypeList})
//     console.log(petTypeList) 
//     }
//     catch(err){res.status(500).send(err)
//     err.statusCode = 500
//     next(err);}
// }
//  else{ console.log("its Extended search " ) }
// }


// async function getPet(req, res, next) {
//     try{
//     const { petId } = req.params;
//     const getThePet = await GetSinglePet(petId);
//     if (getThePet) {
//       res.send(getThePet);
//     }}catch (err) { 
//       // res.status(500).send(err)
//       err.statusCode = 500
//       next(err);
//     };
//   }


// const isNewUser = async (req, res, next) => {
//     const user = await getUserByEmailModel(req.body.email);
//     console.log("find that", user, "if its empty the is no user in SQL");  
//     // if (user.length !== 0) { // for back empty array
//       if (user) { // for back empty undefined  
//       const err = new Error("this email already exists in this application")
//       err.statusCode = 400
//       next(err);
//       // res.status(400).send("this email already exists in this application");
//       return;
//     }
//     next()
//   };




