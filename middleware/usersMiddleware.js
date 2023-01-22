const bcrypt = require("bcrypt");
const Ajv = require("ajv");
const ajv = new Ajv();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  doesThisUserExist,
  getUserByEmailModel,
  isEmailBelongToOther,
} = require("../models/userModels");

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  console.log("find that", user, "if its empty the is no user in SQL");
  // if (user.length !== 0) { // for back empty array
  if (user) {
    // for back empty undefined
    const err = new Error("this email already exists in this application");
    err.statusCode = 400;
    next(err);
    // res.status(400).send("this email already exists in this application");
    return;
  }
  next();
};

const isNewEmailAlredyExist = async (req, res, next) => {
  const userId = req.params['userId'] 
  const {email} = req.body
  const user = await isEmailBelongToOther (email,userId);
// if its comeback empty array its his mail or no mail like this exits , can use it
  if (user.length === 0) { // for back empty array
  console.log(" ok its comeback empty array its his mail or no mail like this exits , can use it " );
  next();
  }
  else{   
  // const err = new Error("this email already exists in this application1!");
  // err.statusCode = 400;
  // next(err);
   res.status(400).send("this email already exists in this application");
    return console.log(" this mail belong to other user" );  ``
}
// next();
console.log('good contune' );  
  }

 
function validateNewUserBody(schema) {
  return (req, res, next) => {
 
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
    // res.status(400).send("Password dont match");
    const err = new Error("Password dont match!");
    err.statusCode = 400;
    // err.message =  'Password match'
    next(err);
    return;
  }
  next();
}

const hashPassword = (req, res, next) => {
  const saltRounds = 10; // level of encryption
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      err.status(500).send(err);
      return;
    }
    req.body.password = hash;
    next();
  });
};

const doesThisUserExistInSQL = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    // for back empty undefined
    res.status(400).send("user with this email does not exist");
    return;
  }
  req.body.user = user;
  next();
};

const auth = (req, res, next) => {
  // console.log("req.cookies", req.cookies);
  console.log("go to auth---.authorization---", req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).send("where is your authorization headers?");
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    console.log("44444444444");
    if (err) {
      console.log(err);
      res.status(401).send("invalid token!!!");
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
      console.log("token next ");
      next();
    }
  });
};

const AdminAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("where is your authorization headers?");
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      res.status(401).send("invalid token!!!");
      return;
    }
    else if (decoded && decoded.type !== 'Admin') {
      res.status(401).send("Unauthorize action!");
    }
    else if (decoded) {
      req.body.type = decoded.type;
      req.body.userId = decoded.id;
  console.log("decoded.type",decoded.type);    
      next();
    }

  });
};





module.exports = {
  validateNewUserBody,
  isPasswordMatch,
  isNewUser,
  hashPassword,
  doesThisUserExistInSQL,
  auth,
  AdminAuth,
  isNewEmailAlredyExist,
};



// const AdminAuth = (req, res, next) => {
//   if (!req.headers.authorization) {
//     res.status(401).send("where is your authorization headers?");
//     return;
//   }
//   const token = req.headers.authorization.replace("Bearer ", "");
//   jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
//     if (err) {
//       console.log(err);
//       res.status(401).send("invalid token!!!");
//       return;
//     }
//     else if (decoded && decoded.type !== 'Admin') {
//       res.status(401).send("Unauthorize action!");
//     }
//     else if (decoded) {
//       req.body.type = decoded.type;
//       req.body.userId = decoded.id;
//   console.log("decoded.type",decoded.type);    
//       next();
//     }

//   });
// };












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




// const isNewEmailAlredyExist = async (req, res, next) => {
//   const userId = req.params['userId'] 
//   const {email} = req.body
//   const user = await isEmailBelongToOther (email,userId);
// // if its comeback empty array its his mail or no mail like this exits , can use it
//   if (user.length === 0) { // for back empty array
//   console.log(" ok its comeback empty array its his mail or no mail like this exits , can use it " );
//   next();
//   }
//   else{ console.log(" this mail belong to other user " );    
//   const err = new Error("this email already exists in this application1");
//   console.log(err);  
//   err.statusCode = 400;
//   next(err);
//    res.status(400).send("this email already exists in this application2");
//     return;

// }
// next();
//   }
