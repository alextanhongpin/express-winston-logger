// Wrong, you don't keep creating new refresh token
// only create it once during signup
// return both access/refresh tokens

const jwt = require('./json-web-token');
const User = require('../model/user.js');

function generateAccessTokens(req, res, next) {
	const user_id = req.user.id;
	const refreshToken = req.user.refreshToken;

	const accessToken = jwt.generateAccessToken(user_id);

	if (!refreshToken) {
		const newRefreshToken = jwt.generateRefreshToken(user_id);
		return storeRefreshToken({
			_id: user_id,
			refreshToken: newRefreshToken
		}).then((data) => {
			res.status(200).json({
				id: user_id,
				access_token: accessToken,
				refresh_token: newRefreshToken,
				success: true
			});
			next();
		});
	} else {
		res.status(200).json({
			id: user_id,
			access_token: accessToken,
			refresh_token: refreshToken,
			success: true
		});
		next();
	}
}

function storeRefreshToken(param) {
	const refreshToken = param.refreshToken;
	const _id = param._id;

	return User.findOneAndUpdate({
		_id: _id
	}, {
		$set: {
			'token.refresh_token': refreshToken
		}
	}, {});
}


module.exports = generateAccessTokens;