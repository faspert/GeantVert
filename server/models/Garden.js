/**
 * Created by Francois on 26.04.2015.
 */
var mongoose = require('mongoose');

// define the schema for our garden model
var sampleSchema = mongoose.Schema({
    username     : {type: String, required: true },
    temperature  : [Number],
    humidity     : [Number],
    date         : Date

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Garden', sampleSchema);