process.env.NODE_ENV = 'test';

const app = require("../framework");
const chai = require("chai");
const mocksdk = require("firebase-mock");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
var mockauth = new mocksdk.MockAuthentication();



describe('Student', function() {
    it('GET all the students', function(done){
        chai
            .request('http://localhost:3000')
            .get('/api/student')
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                else{
                    expect(res).to.have.status(200);
                    done();
                }
            })
    });

    it('Firebase : login and signup', function (done) {
        var users = {
            create: function (credentials) {
                return mockauth.createUser(credentials);
            }
        };
        users.create({
            email: 'krnak526@gmail.com',
            password: '0z1x2c'
        });
        mockauth.flush();

        mockauth.getUserByEmail('krnak526@gmail.com').then(function (user) {
            done();
        });
    });
});

describe('Faculty', function() {
    it('GET all the Faculty', function(done){
        chai
            .request('http://localhost:3000')
            .get('/api/faculty')
            .end(function(err,res){
                if(err){
                    console.log(err);
                }
                else{
                    expect(res).to.have.status(200);
                    done();
                }
            })
    });

    it('Firebase : login and signup', function (done) {
        var users = {
            create: function (credentials) {
                return mockauth.createUser(credentials);
            }
        };
        users.create({
            email: 'krnak526@gmail.com',
            password: '0z1x2c'
        });
        mockauth.flush();

        mockauth.getUserByEmail('krnak526@gmail.com').then(function (user) {
            done();
        });
    });
});
