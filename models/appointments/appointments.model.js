const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Appointment = new Schema({
	start: { type: Number },
	duration: { type: Number },
	name: { type: String },
	number: { type: String },
	cty_code: { type: String },
	email: { type: String },
	short_desc: { type: String },
	topic: { type: String },
	description: { type: String },
	verify: { type: Number },
	ref_code: { type: String },
	request: { type: Number },
	approval: { type: Number },
	date_created: { type: Number },
	date_updated: { type: Number },
});

Appointment.index(
	{
		topic: "text",
		short_desc: "text",
		description: "text",
		name: "text",
		email: "text",
	},
	{
		weights: {
			topic: 10,
			short_desc: 5,
			description: 2,
			name: 2,
			email: 1,
		},
		default_language: "none",
		name: "SearchIndex",
	}
);

Appointment.plugin(mongoosePaginate);

module.exports = mongoose.model("Appointment", Appointment);
