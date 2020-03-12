var mongoose = require('mongoose');
var emoticons = mongoose.model('emoticons');
var profile = mongoose.model('profile');
var course = mongoose.model('course');
var faculty = mongoose.model('faculty');

var updaterating = function(cr,course,rating){
    var i = 0;
    var temp=0;
    while(i<cr.courses.length)
    {
        if(cr.courses[i].coursename == course)
        {
            if(cr.courses[i].rating == 0){
                cr.courses[i].rating += rating;
            }
            else{
                temp = cr.courses[i].rating + rating;
                cr.courses[i].rating = temp/2;
            }

        }
        i+=1;
    }

};
module.exports.addRating = function(req,res){
    emoticons
        .findOne({"coursename":req.query.course,"email":req.query.email})
        .exec(function(err,fb){
            if(err){
                res
                    .json({"msg":"err"})
            }
            else{
                if(fb == null){
                    emoticons
                        .create({
                            email : req.query.email,
                            coursename : req.query.course,
                            rating : req.query.avg
                        },function(err,emo){
                            if(err){
                                console.log("error in Adding rating",err);
                                res
                                    .json({"msg":"err"})
                            }
                            else{
                                profile
                                    .findOne({"email":req.query.email})
                                    .exec(function(err,pro){
                                        if(err){

                                        }
                                        else{
                                            course
                                                .findOne({name : pro.department.toUpperCase(),year : pro.semester.toUpperCase()})
                                                .exec(function(err,cr){
                                                    if(err){
                                                        res
                                                            .json({"message" : "error"})
                                                    }
                                                    else{
                                                        updaterating(cr,req.query.course,parseInt(req.query.avg));
                                                        cr.save(function(err,upcourse){
                                                            if(err){
                                                                console.log("error in updating",err);
                                                            }
                                                            else{
                                                                res
                                                                    .json({"msg":"done"})
                                                            }
                                                        })
                                                    }
                                                });
                                        }
                                    })
                            }

                        })
                }
                else{
                    emoticons
                        .findOneAndUpdate({"coursename":req.query.course,"email":req.query.email},{
                            email : req.query.email,
                            coursename : req.query.course,
                            rating : req.query.avg
                        },function(err,emoti){
                            if(err){
                                console.log("error in Updating",err)
                            }
                            else{
                                profile
                                    .findOne({"email":req.query.email})
                                    .exec(function(err,pro){
                                        if(err){

                                        }
                                        else{
                                            course
                                                .findOne({name : pro.department.toUpperCase(),year : pro.semester.toUpperCase()})
                                                .exec(function(err,cr){
                                                    if(err){
                                                        res
                                                            .json({"message" : "error"})
                                                    }
                                                    else{
                                                        updaterating(cr,req.query.course,parseInt(req.query.avg));
                                                        cr.save(function(err,upcourse){
                                                            if(err){
                                                                console.log("error in updating",err);
                                                            }
                                                            else{
                                                                res
                                                                    .json({"msg":"done"})
                                                            }
                                                        })
                                                    }
                                                });
                                        }
                                    });
                            }
                        })
                }
            }
        })

};

module.exports.getRating = function(req,res){
    profile
        .findOne({"email":req.query.email})
        .exec(function(err,pro){
            if(err){

            }
            course
                .findOne({name : pro.department.toUpperCase(),year : pro.semester.toUpperCase()})
                .exec(function(err,cr){
                    if(err){
                        res
                            .json({"message" : "error"})
                    }
                    else{
                        res
                            .json(cr.courses)
                    }
                });

        })

};
module.exports.getRatingFac = function(req,res){
    faculty
        .findOne({"email":req.query.email})
        .exec(function(err,pro){
            if(err){

            }
            course
                .findOne({name : pro.department.toUpperCase()})
                .exec(function(err,cr){
                    if(err){
                        res
                            .json({"message" : "error"})
                    }
                    else{
                        res
                            .json(cr.courses)
                    }
                });

        })

};
