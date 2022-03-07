const mongoose = require("mongoose");

var User = mongoose.model("User", {
  username: { type: String },
  password: { type: String },
  active: { type: Number },
  date_created: { type: Number },
  date_updated: { type: Number },
});

module.exports = { User };
