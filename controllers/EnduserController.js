const User = require('../models/Enduser');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.loginUsers = (req, res) =>{
    console.log('Hola')
}

exports.show =  (req,res) =>{
    console.log('you got here')
    res.status(200).json({
        message: "Hola People, Bienvenidos"
    })
}
