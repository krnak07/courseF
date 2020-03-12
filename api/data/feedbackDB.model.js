var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var answers = new mongoose.Schema({
    answer : {
        type : String,
        required : true
    },
});
var fdbSchema = new mongoose.Schema({
    course : {
        type : String,
        required : true
    },
    ques : {
        type : String,
        required : true
    },
    answers : [answers]
});

mongoose.model('fdb',fdbSchema);