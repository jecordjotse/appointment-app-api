const mongoose = require("mongoose");
const { USER_DB, PASSWORD } = require("./config/keys");
mongoose.connect(
	`mongodb+srv://${USER_DB}:${PASSWORD}@cluster0.lisho.mongodb.net/appointmentDB?authSource=admin&replicaSet=atlas-ffxj3i-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
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
