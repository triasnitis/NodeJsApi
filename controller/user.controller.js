const { User } = require('../models');

const jwt = require('jsonwebtoken');

const Validator = require("fastest-validator");

const v = new Validator();

const bcrypt = require('bcrypt');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

function read(req, res, next){
    User.findAll({
        where : {isDeleted : false}
    }).then(users => {  
        res.send(users);
    }).catch(err => {
        res.send(err);
    });
}

//-- READ USER BY ID
function readById(req, res, next){
    const id = req.params.id;
    User.findByPk(id).then(users => {
        console.log(users.length);
        if(users.length != 0){ 
            res.send(users); 
        } else { 
            res.status(404) 
            console.log("Empty");
        }
    }).catch(err => {
        res.send(err);
    });
}

function signin(req, res, next){
    User.findOne({ where : {email : req.body.email} }).then(user => {
         if(user){
             if(user.isDeleted == false){
 
                 bcrypt.compare(req.body.password, user.password, function(err, result) {                    
                      if (result)    {
                         
                         // Pembuatan TOKEN saat login sukses
                         const token = jwt.sign({
                             email : user.email,
                             username : user.username,
                             userid : user.id
                         }, JWT_SECRET, function (err, token){
                             res.status(200).json({
                                 status : "SUCCESS",
                                 message : 'Success login',
                                 token : token
                             });      
                         });
                           
                      } else {
                          res.status(401).json({
                              status : "FAILED",
                              message : "Worng Password",
                              data : err
                          })
                      }
                 })
 
             } else {
                 res.status(401).json({
                     message : 'User has been deleted',
                     data: user
                 });
             }
         } else {
             res.status(401).json({
                 message : 'Email not found',
                 data: user
             });
         }
     }).catch(err => {
         res.status(500).json({
             message : 'Login Failed',
             data: err
         });
     });
 
 }

 module.exports = {
    signin
}