const express = require('express');
const path = require('path');

let start = function() {
	const app = express();
	
	app.use(express.static(process.cwd()));
	
	app.listen(4000, function() {
		console.log('Server running at 4000 port.');
	});
	
};

exports.start = start;
