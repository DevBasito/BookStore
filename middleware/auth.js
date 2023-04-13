const jwt = require("jsonwebtoken");
require('dotenv').config();
const {SECRET} = process.env;


exports.authenticateUser = async (req, res, next) => {
    const token = await req.headers.authorization;
    
        
    if (!token) {
        return res.status(500).json({
            message:"No token, Authorization denied. Sign in to get Access"
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


exports.checkIfManager = ( req, res, next) => {
    if (req.user.role !== 'manager' ){
       return  res.status(401).json({
            message: 'Sorry!, This route can only be accessed by a Manager'
        })
    }

    return next();
}

exports.checkIfRegUser = ( req, res, next) => {
    if (req.user.role !== 'user' ){
        res.status(401).json({
            message: 'Sorry!, This route can only be accessed by a Regular User'
        })
    }

    return next();
}

