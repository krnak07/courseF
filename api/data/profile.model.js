var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var profileSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    dateofbirth : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    RollNo : {
      type : String,
      required : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },


});

mongoose.model('profile',profileSchema);