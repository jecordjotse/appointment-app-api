const { default: fetch } = require("node-fetch");
const { AUTH_SERVER } = require("../config/keys");

exports.verifyToken = async (accessToken) => {
	const response = {};
	await fetch(AUTH_SERVER + "/auth/verify", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + accessToken,
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((json) => (response.data = json));
	return response.data;
};
