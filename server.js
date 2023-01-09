const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
require("dotenv").config(); // for keys and hidden data
const cookieParser = require('cookie-parser')
const petsRoute = require("./routes/petsRoutes");
const usersRoute = require("./routes/usersRoutes");
const dbConnection = require("./knex/knex");
const app = express();

const PORT = process.env.PORT || 8080; // console.log(process.env);
app.use(express.json()); // without this we cant get requests body
app.use(cookieParser());
app.use('/images',express.static('petsImages')); //first is the for the path // second is the folder
app.use(cors({origin: 'http://localhost:3000', credentials: true}));//  allow the front access to here with another port
// app.use(morgan("tiny"));

// app.get("/set-cookie", (req, res) => {  
//   res.cookie('sssssssssssss', '5',{maxAge: 5000000000 , httpOnly: true });  
//   res.send('zoom')   });

// app.get('/read-the-cookie', (req, res) => {
//   console.log("get it from the client req.cookie",req.cookies)
//   res.send('bye');
// });

app.use((req, res, next) => {
  console.log("test");
  next();
});


app.use("/pets", petsRoute); //בודק האם לבקשה יש נתיב כזה ואם כן לוקח אותה ל"לפטסראווט
app.use("/users", usersRoute); //בודק האם לבקשה יש נתיב כזה ואם כן לוקח אותה ל"ליוזראווט


app.use('*' , ( req, res ) => { res.status(404).send({message: 'page not found'})  }) //this is for routs

app.use((err, req, res ) => { // erroer in controller
  console.error(err.stack)
  res.status(500).send('Something broke!')
})




dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log("connected to DB", migration);
    app.listen(PORT, () => {
      console.log(`Server Listening on ${PORT} -- Reedy to Work`);
    });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server Listening on ${PORT} -- info from ENV`);
// });

// app.use((req, res, next) => {
//   console.log(`middleware`);
//   next();
// });


// DELETE FROM `petadoption`.`pets` WHERE (`id` = '12');
// UPDATE `petadoption`.`pets` SET `type` = 'cat' WHERE (`id` = '15');
// UPDATE `petadoption`.`pets` SET `type` = 'dog' WHERE (`id` = '18');
// UPDATE `petadoption`.`pets` SET `type` = 'dog' WHERE (`id` = '19');