

const express = require('express');
const app = express();

const PORT = require('./app/config/config.js').port;
app.get('/favicon.ico', function(req, res) {
	console.log('at this annoying route')
    res.status(200);
});

app.get('/', function (req, res) {
	res.status(200).json({
		message: 'hello world'
	});
});

app.get('/api', function (req, res) {
	res.status(200).json({
		message: 'hello api'
	});
});

const middleware = require('./app/middleware/middleware.js')(app);

app.listen(PORT, () => {
	console.log(`listening to port*:${PORT}. press ctrl + c to cancel`);
});

module.exports = app;

