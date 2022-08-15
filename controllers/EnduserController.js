const User = require('../models/Enduser');


exports.loginUsers = (req, res) =>{
    console.log('Hola')
}

exports.show =  (req,res) =>{
    console.log('you got here')
    res.status(200).json({
        message: "Hola People, Bienvenidos"
    })
}
