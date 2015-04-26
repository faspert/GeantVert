/**
 * Created by Francois on 26.04.2015.
 */
var mongoose = require('mongoose');

// define the schema for our garden model
var sampleSchema = mongoose.Schema({
    temperature  : Number,
    humidity     : Number,
    date         : Date
});

var gardenSchema = mongoose.Schema({
    username : {type: String, required: true ,unique : true},
    samples  : [sampleSchema]

});