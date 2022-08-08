const express = require('express');
const app = express();
const cors = require("cors")
require("dotenv").config();

app.use(express.json());
app.use(cors())

const db = require('./models');

const usersRegistrationRouter = require("./routes/UsersRegistration");
app.use("/authentification", usersRegistrationRouter);

const usersBaseRouter = require("./routes/UsersBase");
app.use("/users", usersBaseRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001")
  });
})
.catch((err) => {
  console.log(err);
});


