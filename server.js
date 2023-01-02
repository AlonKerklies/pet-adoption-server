const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
require("dotenv").config(); // for keys and hidden data
const petsRoute = require("./routes/petsRoutes");
const usersRoute = require("./routes/usersRoutes");
const dbConnection = require("./knex/knex");
const app = express();

const PORT = process.env.PORT || 8080; // console.log(process.env);

app.use(express.json()); // without this we cant get requests body
app.use(cors({ origin: "http://localhost:3000" })); // a midelware allow the front access to here with another port
// app.use(morgan("tiny"));

app.use("/pets", petsRoute); //בודק האם לבקשה יש נתיב כזה ואם כן לוקח אותה ל"לפטסראווט
app.use("/users", usersRoute); //בודק האם לבקשה יש נתיב כזה ואם כן לוקח אותה ל"ליוזראווט

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log("connected to DB", migration);
    app.listen(PORT, () => {
      console.log(`Server Listening on ${PORT} -- info from ENV`);
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
