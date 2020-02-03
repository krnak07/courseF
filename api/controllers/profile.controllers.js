var mongoose = require('mongoose');
var firebase = require('firebase');
var profile = mongoose.model('profile');

const firebaseConfig = {
    apiKey: "AIzaSyB6SBZZqFKgFKQ4nAGTM9aLQM84vueN7ss",
    authDomain: "coursereviewsystem.firebaseapp.com",
    databaseURL: "https://coursereviewsystem.firebaseio.com",
    projectId: "coursereviewsystem",
    storageBucket: "coursereviewsystem.appspot.com",
    messagingSenderId: "636522049586",
    appId: "1:636522049586:web:c7076b57265da028278c2b",
    measurementId: "G-7FZG2W9Q00"
};

var app = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var k = 1;

module.exports.signup = function(req,res){
    console.log(typeof(req.query.email));

    auth.createUserWithEmailAndPassword(req.query.email, req.query.pass)
        .then(function () {
            auth.signInWithEmailAndPassword(req.query.email, req.query.pass)
                .then(function () {
                    var user = auth.currentUser;
                    user.updateProfile({
                        displayName: req.query.name,
                    });
                    profile
                        .create({
                            name : req.query.name,
                            email : req.query.email,
                            password : req.query.pass,
                            phoneNo : req.query.phnnum,
                            department : req.query.dept,
                            semester: req.query.sem
                        },function(err,pro) {
                            if(err){
                                console.log(err);
                                res
                                    .json(err)
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
            console.log(error);
            res
                .json({"msg":"already"});
        });


};
module.exports.login = function(req,res) {
    auth.signInWithEmailAndPassword(req.query.e_mail, req.query.pass)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                profile
                    .findOne({name : user.displayName})
                    .exec(function(err,pro){
                        if(err){
                            res
                                .json(err);
                        }
                        res
                            .json({"msg":"v"}); //logged in user details
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
                .status(404)
                .json(error);
        });

};


module.exports.passreset = function(req,res){
    auth.sendPasswordResetEmail(req.query.e_mail)
        .then(function() {
        // Email sent.
            res
                .status(200)
                .json({"Message" : "Email Sent"});

    })
        .catch(function(error) {
        // An error happened.
        res
            .status(400)
            .json(error)
    });
};
