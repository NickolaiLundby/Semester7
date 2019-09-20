const mongoose = require('mongoose');

const server = 'localhost:27017'; // Could be replaced with extern ip
const database = 'studentdb'; // Any database name here

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection succeeded')
        })
        .catch(err => {
            console.error('Database connection failed')
        })
    }
};

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to mongodb://${server}/${database}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

module.exports = new Database();