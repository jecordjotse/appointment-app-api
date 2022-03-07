const express = require("express");
const bodyparser = require("body-parser");

const { mongoose } = require("./db");
var appointmentController = require("./controllers/appointmentController");
var userController = require("./controllers/userController");

var app = express();

app.use(bodyparser.json());

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.listen(3000, () => {
  console.log("Server started at port: 3000");
});

app.use("/appointments", appointmentController);

app.use("/users", userController);
