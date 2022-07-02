const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });
const app = require("./app");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connected succesfully");
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running on port " + port);
});
