var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

var profileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    semester : {
        type : String,
        required : true
    },


});

mongoose.model('profile',profileSchema);