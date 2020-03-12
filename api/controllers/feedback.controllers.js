var mongoose = require('mongoose');
var feedback = mongoose.model('feedback');
var faculty = mongoose.model('faculty');
var fdb = mongoose.model('fdb');


var addtoFDB = function(course,ans1,ans2,ans3){
    fdb
        .findOne({"course":course,"ques":"q1"})
        .exec(function (err,f) {
            if(err){

            }
            else{
                if(f == null){
                    fdb
                        .create({
                            course : course,
                            ques : "q1"
                        },function(err,ff){
                            if(err){

                            }
                            else{
                                ff.answers.push({
                                    answer : ans1
                                });
                                ff.save(function(err,fff){
                                    if(err){
                                        console.log(err);
                                    }
                                })
                            }
                        })
                }
                else{
                    f.answers.push({
                        answer : ans1
                    });
                    f.save(function(err,fff){
                        if(err){
                            console.log(err);
                        }

                    })
                }
            }
        });
    //ques2
    fdb
        .findOne({"course":course,"ques":"q2"})
        .exec(function (err,f) {
            if(err){

            }
            else{
                if(f == null){
                    fdb
                        .create({
                            course : course,
                            ques : "q2"
                        },function(err,ff){
                            if(err){

                            }
                            else{
                                ff.answers.push({
                                    answer : ans2
                                });
                                ff.save(function(err,fff){
                                    if(err){
                                        console.log(err);
                                    }
                                })
                            }
                        })
                }
                else{
                    f.answers.push({
                        answer : ans2
                    });
                    f.save(function(err,fff){
                        if(err){
                            console.log(err);
                        }
                    })
                }
            }
        });

    //ques3
    fdb
        .findOne({"course":course,"ques":"q3"})
        .exec(function (err,f) {
            if(err){

            }
            else{
                if(f == null){
                    fdb
                        .create({
                            course : course,
                            ques : "q3"
                        },function(err,ff){
                            if(err){

                            }
                            else{
                                ff.answers.push({
                                    answer : ans3
                                });
                                ff.save(function(err,fff){
                                    if(err){
                                        console.log(err);
                                    }
                                })
                            }
                        })
                }
                else{
                    f.answers.push({
                        answer : ans3
                    });
                    f.save(function(err,fff){
                        if(err){
                            console.log(err);
                        }
                    })
                }
            }
        })
}
module.exports.addOne = function(req,res){
    var q1 = "How do you think could the syllabus be improvised to add more effectiveness?";
    var q2 = "How do you think the role of the faculty improved the course?";
    var q3 = "Any other suggestions?";
    feedback
        .findOne({"coursename":req.query.course,"email":req.query.email})
        .exec(function(err,fb){
            if(err){
                res
                    .json({"msg":"err"})
            }
            else{
                if(fb == null){
                    feedback
                        .create({
                            email : req.query.email,
                            coursename: req.query.course,
                            question1 : q1,
                            answer1 : req.query.ans1,
                            question2 : q2,
                            answer2 : req.query.ans2,
                            question3 : q3,
                            answer3 : req.query.ans3,
                        },function(err,fb){
                            if(err){
                                console.log("Error in feedback submission : ",err);
                                res
                                    .json({"msg":"err"})
                            }
                            else{
                                addtoFDB(req.query.course,req.query.ans1,req.query.ans2,req.query.ans3);
                                res
                                    .json({"msg":"done"})
                            }
                        })
                }
                else{
                    feedback
                        .findOneAndUpdate({"coursename":req.query.course,"email":req.query.email},{
                            email : req.query.email,
                            coursename: req.query.course,
                            question1 : q1,
                            answer1 : req.query.ans1,
                            question2 : q2,
                            answer2 : req.query.ans2,
                            question3 : q3,
                            answer3 : req.query.ans3,
                        },function(err,fb){
                            if(err){
                                console.log("error in submission",err)
                            }
                            else{
                                addtoFDB(req.query.course,req.query.ans1,req.query.ans2,req.query.ans3);
                                res
                                    .json({"msg":"done"})
                            }
                        })
                }
            }
        })


};

module.exports.getFeedback = function(req,res){
    fdb
        .findOne({"ques":req.query.ques,"course":req.query.coursename})
        .exec(function(err,fb){
            if(err){
                console.log("error in fetching feedback",err);
            }
            else{
                if(fb==null){
                    res
                        .json({"answer":"No reviews yet!"})
                }
                else{
                    res
                        .json(fb.answers)


















                }

            }

        })
};

