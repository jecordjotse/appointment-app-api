require("dotenv").config();

const USER_DB = process.env.user_DB;
const PASSWORD = process.env.pass;
const MONGO_URI = process.env.MONGO_URI;
const AUTH_SERVER = process.env.AUTH_SERVER;

module.exports = {
	USER_DB,
	PASSWORD,
	MONGO_URI,
	AUTH_SERVER,
};
