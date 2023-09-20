
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/Enduser');
const { json } = require('express');
const { SECRET } = process.env;




exports.passwordRecovery = async (req, res) => {

    const {email, password} = req.body;

    let user = await User.findOne({email: email})

    if (!user) {
        return res.status(500).json({
            message: "This User Doesnt Exist"
        })
    } 

    const generatedPassword = Math.random().toString(36).substring(2,9);

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            throw err
        }
        else {
            bcrypt.hash(generatedPassword, salt, (err, hashedpassword) => {
                if (err) {
                    throw err
                }
                

                User.findByIdAndUpdate(user._id, {password: hashedpassword}, (err, passwordRecovered)=>{
                    if (err) {
                        throw err
                    }
            
                    res.status(200).json({
                        message: 'Your new password has been sent to your mail. Ensure to change it immediately you sign in',
                        passwordRecovered
                    })
                })


            })
        }
    })    


    

}

exports.changePassword = async (req,res) => {
    const {password} = req.body

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            throw err
        }
        else {
            bcrypt.hash(password, salt, (err, hashedpassword) => {
                if (err) {
                    throw err
                }
                User.findByIdAndUpdate(req.user.id, {password: hashedpassword}, (err, PasswordChanged)=>{
                    if (err) {
                        throw err
                    }
            
                    res.status(200).json({
                        message: 'Your password has been Changed',
                        PasswordChanged
                    })
                }) 


            })
        }
    })


    
    
}