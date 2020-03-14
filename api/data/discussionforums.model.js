var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var answer = new mongoose.Schema({
    answer : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
});
var discussionForum = new mongoose.Schema({
   coursename : {
       type : String,
       required : true
   },
   email : {
      type : String,
      required: true
   },
    question : {
       type : String,
       required : true
    },
    answers : [answer]
});

mongoose.model('discussionForums',discussionForum);
