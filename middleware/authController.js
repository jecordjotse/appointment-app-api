const { verifyToken } = require("../services/dromeworks");

const getAuthToken = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		req.authToken = req.headers.authorization.split(" ")[1];
	} else {
		req.authToken = "";
	}
	next();
};

exports.authorizeSource = (req, res, next) => {
	try {
		getAuthToken(req, res, async () => {
			const { authToken } = req;
			const _response = await verifyToken(authToken);
			const { VERIFIED, USER } = _response.Body;
			if (VERIFIED)
				req.user = {
					userId: USER,
				};
			req.VERIFIED = VERIFIED;

			return next();
		});
	} catch (error) {
		return res.status(401).send({ AuthorizationError: "Unauthorized" });
	}
};
