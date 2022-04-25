const mongoose = require("mongoose");
const user = process.env.user_DB;
const pass = process.env.pass;
mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0.lisho.mongodb.net/appointmentDB?authSource=admin&replicaSet=atlas-ffxj3i-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
  (err) => {
    if (!err) console.log("MongoDB connection succeeded.");
    else
      console.log(
        "Error in DB connection: ",
        JSON.stringify(err, undefined, 2)
      );
  }
);

module.export = mongoose;
