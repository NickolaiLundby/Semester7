var mongoose = require('mongoose');
var Student = require('./models/student')

var dbURI = 'mongodb://localhost:27017/3b';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);

/*
    var student1 = new Student({name: 'Jens', grade: 12});
    student1.save(function (err, Student) {
        if (err) return console.error(err);
        console.log(Student.name + " saved ");
      });
    var student2 = new Student({name: 'Peter', grade: 7});
    student2.save(function (err, Student) {
        if (err) return console.error(err);
        console.log(Student.name + " saved ");
      });
    var student3 = new Student({name: 'Ole', grade: 4});
    student3.save(function (err, Student) {
        if (err) return console.error(err);
        console.log(Student.name + " saved ");
      });
*/
    var query = { name: 'Jens' };
    Student.deleteOne(query, function (err, result){
        if(err){
            console.log("Query Error")
        } else {
            console.log(query.name +" deleted ");
        }
    });
    });
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
    });
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
    });

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through
${msg}`);
    callback();
    });
};
    