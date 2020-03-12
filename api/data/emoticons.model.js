var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var emoticonsSchema = new mongoose.Schema({
    email:{
      type:String,
      required : true
    },
    coursename : {
        type : String,
        required : true
    },
    rating: {
        type : Number,
        required: true
    }
});

mongoose.model('emoticons',emoticonsSchema);