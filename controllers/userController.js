const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { User } = require("../models/users");

router.get("/", (req, res) => {
  if (req.query.admin)
    if (req.query.admin === "dromeIsFutr")
      User.find((err, docs) => {
        if (!err) res.send(docs);
        else
          console.log(
            "Error in retrieving users: ",
            JSON.stringify(err, undefined, 2)
          );
      });
    else {
      console.log("Error in retrieving users: ", "Unauthorized Attemp");
      res.send({ err: "Not Authorized" });
    }
  else
    User.find()
      .select("username")
      .exec((err, docs) => {
        if (!err) res.send(docs);
        else
          console.log(
            "Error in retrieving users: ",
            JSON.stringify(err, undefined, 2)
          );
      });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Appointment.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in retrieving appoitment: ",
        JSON.stringify(err, undefined, 2)
      );
  });
});

router.post("/", (req, res) => {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    active: req.body.active ?? 1,
  });
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else
      console.log("Error in adding users: ", JSON.stringify(err, undefined, 2));
  });
});

router.post("/sign-in", (req, res) => {
  if (!!req.body.username) {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    User.find()
      .where("username")
      .equals(user.username)
      .exec((err, docs) => {
        if (!err)
          if (!!docs[0])
            res.send({
              status: 200,
              message: "available",
              username: docs[0].username,
            });
          else res.send({ status: 204, message: "not available" });
        else {
          console.log(
            "Error in retrieving users: ",
            JSON.stringify(err, undefined, 2)
          );
        }
      });
  }
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  var user = {
    username: req.body.username,
    password: req.body.password,
    active: req.body.active,
  };

  Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true },
    (err, doc) => {
      if (!err) res.send(doc);
      else
        console.log(
          "Error in updating user: ",
          JSON.stringify(err, undefined, 2)
        );
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Appointment.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in deleting user: ",
        JSON.stringify(err, undefined, 2)
      );
  });
});

module.exports = router;
