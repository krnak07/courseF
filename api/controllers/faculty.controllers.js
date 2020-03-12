var mongoose = require('mongoose');
var firebase = require('firebase');
var faculty = mongoose.model('faculty');
var auth = firebase.auth();

module.exports.signup = function(req,res){

    auth.createUserWithEmailAndPassword(req.query.email, req.query.pass)
        .then(function () {
            auth.signInWithEmailAndPassword(req.query.email, req.query.pass)
                .then(function () {
                    var user = auth.currentUser;
                    user.updateProfile({
                        displayName: req.query.name,
                    });
                    faculty
                        .create({
                            name : req.query.name,
                            email : req.query.email,
                            password : req.query.pass,
                            phoneNo : req.query.phnnum,
                            department : req.query.dept,
                        },function(err,pro) {
                            if(err){
                                console.log(err);
                                res
                                    .json({"msg":"de"})
                            }
                            else {
                                user.sendEmailVerification()
                                    .then(function () {
                                        res
                                            .json({"msg" : "created"});
                                        console.log("User created : ",req.query.name);
                                    });

                            }
                        });

                });
        })
        .catch(function (error) {
            if(error.code == "auth/weak-password"){
                res
                    .json({"msg" : "wp"})
            }
            else if(error.code == "auth/email-already-in-use"){
                res
                    .json({"msg":"already"});
            }
            else if(error.code == "auth/invalid-email"){
                res
                    .json({"msg":"ie"});
            }
        });


};
module.exports.login = function(req,res) {

    auth.signInWithEmailAndPassword(req.query.e_mail, req.query.pass)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                faculty
                    .findOne({name : user.displayName})
                    .exec(function(err,pro){
                        if(err){
                            res
                                .json({"msg" :"de"});
                        }
                        else{
                            if(pro == null){
                                res
                                    .json({"msg" : "ns"});
                            }
                            else{
                                res
                                    .json({"msg" : "v"});
                            }
                        }

                    });

            }
            else
            {
                res
                    .json({"msg" : "nv"});
            }
        })
        .catch(function(error) {
            res
                .json({"msg" : "ae"});
        });

};

module.exports.facultyGetall = function(req,res){
    faculty
        .find({})
        .exec(function(err,pro){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else{
                res
                    .status(200)
                    .json(pro)
            }
        })
};
