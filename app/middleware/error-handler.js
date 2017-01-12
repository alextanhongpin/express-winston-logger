// app/middlewares/errors





function development_error_handler(err, req, res, next) {

	console.log(req.url, req.params, err)
	res.status(err.status || 500).json({
		title: 'Error ' + err.status,
		message: err.message,
		error: err
	});
}

function production_error_handler(err, req, res, next) {
	res.status(err.status || 500).json({
		title: 'Error ' + err.status,
		message: err.message,
		error: {}
	});
}

/*
 * Handles xhr_errors
**/
// function xhr_error(err, req, res, next) {

// 	//if (req.xhr) {
// 	if (err) {
// 		return res.status(401).json({
// 			success: false,
// 			error_message: (err && err.message) ? err.message : err
// 		});
// 	}

// 	//}
// }

module.exports = {
	//xhr_error,
	production_error_handler,
	development_error_handler
}