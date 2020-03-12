var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var feedbackSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    coursename : {
        type : String,
        required : true
    },
    question1 : {
        type : String,
        required : true
    },
    answer1 : {
        type: String,
        required : true
    },
    question2 : {
        type : String,
        required : true
    },
    answer2 : {
        type: String,
        required : true
    },
    question3 : {
        type : String,
        required : true
    },
    answer3 : {
        type: String,
        required : true
    }


});

mongoose.model('feedback',feedbackSchema);