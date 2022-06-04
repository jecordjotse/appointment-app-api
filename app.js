const express = require("express");
const bodyparser = require("body-parser");
const appointmentController = require("./controllers/appointmentController");
const { AUTH_SERVER } = require("./config/keys");
const { mongoose } = require("./db-dev");

const allowedOrigins = [
	"http://127.0.0.1:3001",
	"http://localhost:3001",
	"https://appointment-app-dromeworks.netlify.app",
	AUTH_SERVER,
];

const app = express();
app.use(
	bodyparser.urlencoded({
		extended: true,
	})
);
app.use(bodyparser.json());

// Add headers before the routes are defined
app.use((req, res, next) => {
	// Website you wish to allow to connect
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
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

const port = process.env.port || 8081;

app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});

app.use("/appointments", appointmentController);
