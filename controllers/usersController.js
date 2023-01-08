const crypto = require("crypto");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { readAllUsersModel, addUserModel } = require("../models/userModels");

const signup = async (req, res) => {
  console.log("finally the last station signup");
  try {
    console.log("what u get so far ", req.body);
    const { firstName, lastName, email, phone, password } = req.body;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
      type: "OrdinaryUser",
      profilePic: "",
    };

    const userAdded = await addUserModel(newUser); //    מעביר לביצוע ולהכניס לשרת , אם זה קרה
    res.send({ userId: userAdded, ok: true }); //  וחיובי התוצאה משלחת לפרונט
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
   console.log("----------- login -----------"  );
  const { password, hashPssword , id ,user } = req.body;
 
  console.log("user.firstName ", user.firstName , "id ", user.id,  );

  try {
    bcrypt.compare(password,  user.password  , (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send("Password incorrect");
      } else {
        const token = jwt.sign({ id: user.id, type: user.type   }, process.env.TOKEN_SECRET, { expiresIn: "2d",});
        console.log("----------------------token--------",token);
        res.cookie('token', token,{maxAge: 86000000 , httpOnly: true });  
        res.cookie('firstName', user.firstName,{maxAge: 86000000 , httpOnly: true });  
        res.send({ok:true , token: token,   firstName: user.firstName, id: user.id,    type: user.type   });
        // console.log("res.cookie--------",res.cookie);
        // console.log("res.send--------",res.send);
       }
 
});

}
 catch (err) {
  res.status(500).send(err);
};
}
    
//  
   
// (req, res) => {
//     try {
//       res.send("user match with password");

//       // res.send(200);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//   }



module.exports = { signup ,login };

// function deletePet(req, res) {
//   const { petId } = req.params;
//   const deleted = deletePetModel(petId);
//   if (deleted) {
//     res.send({ ok: true, deletedId: petId });
//   }
// }

// function addPet(req, res) {
//     const { petId } = req.params;
//     const deleted = deletePetModel(petId);
//     if (deleted) {
//       res.send({ ok: true, deletedId: petyId });
//     }
//   }

// module.exports = {deletePet, addPet}


    // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"  );
    // console.log(",user.password",user.password );
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"  );
    // console.log("req.body",req.body );
    // console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"  );
    // console.log("req.body.password", req.body.password   );
    // console.log("cccccccccccccccccccccccccccccccccccccc"  );
    // console.log("password shuld be aa",password );