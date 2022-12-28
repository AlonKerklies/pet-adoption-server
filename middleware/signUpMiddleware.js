const Ajv = require("ajv");
const ajv = new Ajv();
const  {doesThisUserExist } = require('../models/userModels')


function checkIfUserExists(req, res, next){
// console.log(req.body.email); 
 const {email} = req.body;
 console.log(email);
 const user = doesThisUserExist(email)
 console.log("find that", user); //exists after checking
 if (user) { 
  res.status(400).send('this email already exists in this application');
  return; };
 
next();
}

function validateNewUserBody(schema) {
  return(req,res,next) =>{
    // const data = {foo: 1, bar: "abc"}
    const valid = ajv.validate(schema, req.body)
    if (!valid) {
      res.status(400).send(ajv.errors[0].message)
      console.log(ajv.errors[0].message)
      return;
    }
    next()
  }
};





module.exports = {checkIfUserExists, validateNewUserBody}