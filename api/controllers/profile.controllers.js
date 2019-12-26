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

    profile
        .findOne({RollNo : req.body.rollno})
        .exec(function(err,pro){
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            else
            {
                if(pro == null ){
                    k = 0;
                    auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
                        .then(function () {
                            auth.signInWithEmailAndPassword(req.body.email, req.body.password)
                                .then(function () {
                                    var user = auth.currentUser;
                                    console.log("User created : ",req.body.fname);
                                    user.updateProfile({
                                        displayName: req.body.rollno,
                                    });
                                    profile
                                        .create({
                                            firstname : req.body.fname,
                                            lastname : req.body.lname,
                                            dateofbirth : req.body.dob,
                                            email : req.body.email,
                                            password : req.body.password,
                                            phoneNo : req.body.phone,
                                            address : req.body.addr,
                                            RollNo: req.body.rollno
                                        },function(err,pro) {
                                            if(err){
                                                res
                                                    .status(400)
                                                    .json(err)
                                            }
                                            else {
                                                user.sendEmailVerification()
                                                    .then(function () {
                                                        res
                                                            .status(200)
                                                            .json(pro);
                                                    });

                                            }
                                        });

                                });
                        })
                        .catch(function (error) {
                            res
                                .status(400)
                                .json(error);
                        });
                }

                else
                {
                    res
                        .status(200)
                        .json({"Message": "User Already Exists"});
                }

            }
        });


};
module.exports.login = function(req,res) {
    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = auth.currentUser;
            if(user.emailVerified)
            {
                profile
                    .findOne({RollNo : user.displayName})
                    .exec(function(err,pro){
                        if(err){
                            res
                                .status(400)
                                .json(err);
                        }
                        res
                            .status(200)
                            .json(pro); //logged in user details
                    });

            }
            else
            {
                res
                    .status(400)
                    .json({"message" : "User not verified"});
            }
        })
        .catch(function(error) {
            res
                .status(404)
                .json(error);
        });

};


module.exports.passreset = function(req,res){
    auth.sendPasswordResetEmail(req.body.email)
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
