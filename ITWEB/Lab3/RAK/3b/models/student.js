//Import the mongoose module
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  grade: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', StudentSchema);