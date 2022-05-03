const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var Appointment = require("../models/appointments");

router.get("/", (req, res) => {
  if (req.query.ref_code)
    Appointment.find({ ref_code: { $regex: `^${req.query.ref_code}` } }).exec(
      (err, docs) => {
        if (!err) res.send(docs);
        else
          console.log(
            "Error in retrieving appoitments: ",
            JSON.stringify(err, undefined, 2)
          );
      }
    );
  else
    Appointment.find((err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error in retrieving appoitments: ",
          JSON.stringify(err, undefined, 2)
        );
    });
});

router.get("/s/", (req, res) => {
  let AppointmentsRef;

  if (req.query.q) {
    AppointmentsRef = Appointment.find({
      $text: { $search: req.query.q },
    });
  } else AppointmentsRef = Appointment.find();

  if (req.query.max_duration) {
    AppointmentsRef = AppointmentsRef.where("duration").lt(
      req.query.max_duration
    );
  }

  if (req.query.min_duration) {
    AppointmentsRef = AppointmentsRef.where("duration").gt(
      req.query.min_duration
    );
  }

  if (req.query.duration) {
    AppointmentsRef = AppointmentsRef.where("duration").equals(
      req.query.duration
    );
  }

  if (req.query.start_date) {
    AppointmentsRef = AppointmentsRef.where("start")
      .gt(req.query.start_date - 1)
      .lt(req.query.start_date + 86400000);
  }

  if (req.query.approval_status) {
    AppointmentsRef = AppointmentsRef.where("approval").equals(
      req.query.approval_status
    );
  }

  if (req.query.before_date) {
    AppointmentsRef = AppointmentsRef.where("start").lt(
      req.query.before_date + 1
    );
  }

  AppointmentsRef = AppointmentsRef.where("request").equals(1);

  AppointmentsRef.exec((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error in retrieving appoitments: ",
        JSON.stringify(err, undefined, 2)
      );
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ error: `No record with given id: ${req.params.id}` });

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
  var aptmt = new Appointment({
    start: "",
    duration: null,
    name: req.body.name,
    number: req.body.number,
    cty_code: req.body.cty_code,
    email: req.body.email,
    short_desc: "",
    topic: "",
    description: "",
    verify: 0,
    ref_code: "",
    request: 0,
    approval: 0,
  });
  aptmt.save((err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in adding appoitments: ",
        JSON.stringify(err, undefined, 2)
      );
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ error: `No record with given id: ${req.params.id}` });

  var aptmt = {
    start: req.body.start,
    duration: req.body.duration,
    name: req.body.name,
    number: req.body.number,
    cty_code: req.body.cty_code,
    email: req.body.email,
    topic: req.body.topic,
    short_desc: req.body.short_desc,
    description: req.body.description,
    verify: req.body.verify,
    ref_code: req.body.ref_code,
    request: req.body.request,
    approval: req.body.approval,
  };

  Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: aptmt },
    { new: true },
    (err, doc) => {
      if (!err) res.send(doc);
      else
        console.log(
          "Error in updating appoitment: ",
          JSON.stringify(err, undefined, 2)
        );
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ error: `No record with given id: ${req.params.id}` });

  Appointment.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in deleting appoitment: ",
        JSON.stringify(err, undefined, 2)
      );
  });
});

module.exports = router;
