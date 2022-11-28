const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SECRET} = process.env;


exports.authenticateUser = async (req, res, next) => {
    const token = await req.cookies.jwt;
        console.log('jwt: ' + token);
    if (!token) {
        return res.status(500).json({
            message:"No token, Authorization denied"
        })
        
    }

    try {
        const decoded = jwt.verify(token, SECRET )

        req.user = decoded.user;
        next()
    } 
    catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: "Token Invalid"
        })
        
        
    }
}

exports.checkIfStaff = ( req, res, next) => {
    if (req.user.role !== 'staff' ){
        res.status(401).json({
            message: 'Sorry!, This route can only be accessed by a Staff'
        })
    }

    return next();
}


exports.checkIfManager = ( req, res, next) => {
    if (req.user.role !== 'manager' ){
        res.status(401).json({
            message: 'Sorry!, This route can only be accessed by a Manager'
        })
    }

    return next();
}

exports.checkIfRegUser = ( req, res, next) => {
    if (req.user.role !== 'reg_user' ){
        res.status(401).json({
            message: 'Sorry!, This route can only be accessed by a Regular User'
        })
    }

    return next();
}


exports.checkIfAdmin = ( req, res, next) => {
    if (req.user.role !== 'admin' ){
        res.status(401).json({
            message: 'Sorry!, This route can only be accessed by an Admin'
        })
    }

    return next();
}

// exports.checkIfRole = (role) => {
//     (req, res, next) => {
//         if (req.user.role !== role ){
//             res.status(401).json({
//                 message: 'Sorry!, This route can only be accessed by Admin'
//             })
//         }
    
//         return next();
    
//     }
// }