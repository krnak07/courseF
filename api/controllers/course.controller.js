var mongoose = require('mongoose');
var firebase = require('firebase');
var course = mongoose.model('course');
var profile = mongoose.model('profile');
var feedback = mongoose.model('feedback');
var faculty = mongoose.model('faculty');
var auth = firebase.auth();
var unlisted = [];
var reqg;
var resg;
module.exports.addDept = function(req,res){
    course
        .create({
            name : req.query.dept.toUpperCase(),
            year : req.query.year.toUpperCase(),
        },function(err,cr) {
            if (err) {
                res
                    .json(err)
            } else {
                res
                    .json(cr)
            }
        });
};

module.exports.addCourse = function (req,res) {
    course
        .findOne({name : req.query.dept.toUpperCase(),year : req.query.year.toUpperCase()})
        .exec(function(err,cr){
            if(err){
                res
                    .json({"message" : "error"})
            }
            else{
                cr.courses.push({
                    coursename: req.query.cname,
                    rating : 0
                });

                cr.save(function(err,cr1){
                    if(err){
                        res
                            .json(err)
                    }
                    else{
                        res
                            .json(cr1)
                    }
                })
            }
        })

};

module.exports.getcourses = function(req,res){
    profile
        .findOne({email : req.query.email})
        .exec(function(err,pro){
            if(err){
                res
                    .json({"message":"error"})
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
                            res
                                .json(cr.courses)
                        }
                    });


            }

        })
};
module.exports.getcoursesFac = function(req,res){
    faculty
        .findOne({email : req.query.email})
        .exec(function(err,pro){
            if(err){
                res
                    .json({"message":"error"})
            }
            else{
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


            }

        })
};
