var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var cname = new mongoose.Schema({
    coursename : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
});
var courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    courses : [cname]
});

mongoose.model('course',courseSchema);