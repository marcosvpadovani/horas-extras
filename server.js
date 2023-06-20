require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

const dbConn = require("./db/index");

dbConn
  .sync()
  .then(() => {
    console.log("DATABASE INITIALIZED...");
    app.listen(PORT, () => console.log("SERVER RUNNING ON PORT " + PORT));
  })
  .catch((err) => console.log(err));
