var mongoose = require('mongoose');
var firebase = require('firebase');
var df = mongoose.model('discussionForums');

module.exports.addQuestion = function(req,res){
    df
        .create({
            coursename: req.query.course,
            email : req.query.email,
            question : req.query.ques
        },function(err,dfCreated){
            if(err){
                console.log("error in adding question",err);
            }
            else{
                res
                    .json({"msg":"done"})
            }
        })
};

module.exports.getQuestions = function(req,res){
    df
        .find({"coursename":req.query.course})
        .exec(function(err,dfs){
            if(err){
                console.log('error in getting questions',err)
            }
            else{
                res
                    .json(dfs)
            }

        })
};

module.exports.addAnswers = function(req,res){
    df
        .findOne({"coursename":req.query.course,"question":req.query.ques})
        .exec(function(err,dfs){
            if(err){
                console.log("error in finding question",err)
            }
            else{
                dfs.answers.push({
                    answer : req.query.answer,
                    email : req.query.email
                });
                dfs.save(function(err,dfupdated){
                    if(err){
                        console.log("error in adding answer",err);
                    }
                    else{
                        res
                            .json({"msg":"done"})
                    }
                })
            }
        })
};
module.exports.getAnswers = function(req,res){
    df
        .findOne({"coursename":req.query.course,"question":req.query.ques})
        .exec(function(err,dfs){
            if(err){
                console.log("error in getting answer",err)
            }
            else{
                if(dfs == null){
                    res
                        .json({"answer":"no answers yet"});
                }
                else{
                    res
                        .json(dfs.answers)
                }
            }
        })
};