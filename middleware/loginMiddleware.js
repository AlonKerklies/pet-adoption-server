const Ajv = require("ajv");
const ajv = new Ajv();
const  {doesThisUserExist , doesThisPasswordMatchUser} = require('../models/userModels')


function checkIfUserExistsforLogin(req, res, next){
 const {email} = req.body;
 console.log(email);
 const user = doesThisUserExist(email)

 if (!user) { 
  res.status(400).send('There is no such user in the system');
  return; };
 console.log("find that", user); //exists after checking
next();
}

function checkPasswordMatch(req, res, next){
  const {email} = req.body;
  const {password} = req.body;
  const userInfo = doesThisUserExist(email)

  if (userInfo.password === password ) { 

    res.status(200).send(userInfo);
    return; }

 else{
console.log("the password in db - ", userInfo.password);
 console.log("the req password is  ", password);

    res.status(400).send('Incorrect password');
    return; }

 



  //  const match = doesThisPasswordMatchUser(email,password)

   console.log("paswword match the user name"); //exists after checking
  next();
  }








// function validateExistUserBody(schema) {
//   return(req,res,next) =>{
//     // const data = {foo: 1, bar: "abc"}
//     const valid = ajv.validate(schema, req.body)
//     if (!valid) {
//       res.status(400).send(ajv.errors[0].message)
//       console.log(ajv.errors[0].message)
//       return;
//     }
//     next()
//   }
// };





module.exports = {checkIfUserExistsforLogin, checkPasswordMatch
  
  // validateExistUserBody

}