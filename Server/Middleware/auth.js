//Middleware happens betwwen the user's action and the controller logic,
//in order to check whether the user is right or not

import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.Authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, secret);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
