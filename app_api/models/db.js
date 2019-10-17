const mongoose = require('mongoose');
let dbURI = 'mongodb://localhost/mhdData';
if (process.env.NODE_ENV === 'production') {
	// This uses my password. Better way is to:: 
	//  dbURI = process.env.MONGODB_URI;
	// but then i have to type the URI in everytime so not doing that right now
	dbURI = 'mongodb+srv://dkoMines:dko123@cluster0-mluab.mongodb.net/test?retryWrites=true&w=majority';
}
mongoose.connect(dbURI, {useNewUrlParser: true});
// Msg to consoles::
mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

// Closing the connection::
const readLine = require('readline');
if (process.platform === 'win32') {
	const rl = readLine.createInterface ({
		input: process.stdin,
		output: process.stdout
	});
	rl.on ('SIGINT', () => {
		process.emit ("SIGINT");
	});
}
const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close ( () => {
		console.log('Mongoose disconnnected through $(msg)')
		callback();
	});
}
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
process.on('SIGINT', () => {
	gracefulShutdown('App termination', () => {
		process.exit(0);
	});
});
process.on('SIGTERM', () => {
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

require('./usersSchema');
require('./mhdUnusedSchema');
require('./mhdUsedSchema');

