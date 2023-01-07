const bcrypt = require('bcrypt');
const Ajv = require("ajv");
const ajv = new Ajv();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  doesThisUserExist,
  getUserByEmailModel,
} = require("../models/userModels");

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  console.log("find that", user, "if its empty the is no user in SQL");  
  // if (user.length !== 0) { // for back empty array
    if (user) { // for back empty undefined  
    res.status(400).send("this email already exists in this application");
    return;
  }
  next()
};

function validateNewUserBody(schema) {
  return (req, res, next) => {
    // const data = {foo: 1, bar: "abc"}
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      console.log(ajv.errors[0].message);
      return;
    }
    next();
  };
}

function isPasswordMatch(req, res, next) {
  if (req.body.password !== req.body.repeatpassword) {
    res.status(400).send("Password dont match");
    return;
  }
  console.log("Password match");
  next();
}

const hashPassword = (req, res, next) => {
  const saltRounds = 10; // level of encryption
  bcrypt.hash(req.body.password , saltRounds, (err, hash) => {
  if(err){
    err.status(500).send(err);
    return
  }
  req.body.password = hash ;  next();
});
};

const doesThisUserExistInSQL = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
    if (!user) { // for back empty undefined  
    res.status(400).send("user with this email does not exist");
    return;
  } 
  req.body.user = user;
    next();
};

const auth = (req ,res ,next) => {
console.log("go to auth"); 
// console.log("req.cookies", req.cookies); 
console.log("req.headers----------", req.headers); 
console.log("req.headers.authorization----------", req.headers.authorization); 

if(!req.headers.authorization){res.status(401).send('where is your authorization headers?')
return}
const token = req.headers.authorization.replace('Bearer ','')
jwt.verify(token, process.env.TOKEN_SECRET , function(err, decoded) {
console.log("11111111111111111111")
if (err) {console.log(err); res.status(401).send('invalid token!!!'); return }   
  if ( decoded) { req.body.userId = decoded.id; next(); }

 
});   
}


module.exports = { validateNewUserBody, isPasswordMatch, isNewUser,
   hashPassword, doesThisUserExistInSQL, auth };

// function checkIfUserExistsforSignUP(req, res, next) {
//   // console.log(req.body.email);
//   const { email } = req.body;
//   console.log(email);
//   const user = doesThisUserExist(email);
//   console.log("find that", user); //exists after checking
//   if (user) {
//     res.status(400).send("this email already exists in this application");
//     return;
//   }
//   next();
// }
