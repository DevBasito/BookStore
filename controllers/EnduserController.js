
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require('../models/Enduser');
const { json } = require('express');
const { SECRET } = process.env


exports.register = (req, res) => {

    // check if email already exist in the system

    User.findOne({ email: req.body.email }, (err, userExists) => {
        if (userExists) {
            return res.status(400).json({
                message: 'A User with this email already exists'
            })
        }
        if (err) {
            throw err

        }
    })

    const { firstname, lastname, role, email, password } = req.body;

    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: role
    },
        (err, newuser) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }

            else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        throw err
                    }
                    else {
                        bcrypt.hash(password, salt, (err, hashedpassword) => {
                            if (err) {
                                throw err
                            }
                            newuser.password = hashedpassword;
                            newuser.save((err) => {
                                if (err) {
                                    throw err
                                }



                                const payload = {
                                    id: newuser._id,
                                    firstname: newuser.firstname,
                                    lastname: newuser.lastname,
                                    email: newuser.email,
                                    // password: newuser.password,
                                    role: newuser.role

                                }
                                
                                jwt.sign(payload, SECRET, { expiresIn: '1d'}, (err, token) => {
                                    if (err) {
                                        throw err
                                    }

                                    

                                    res.status(200).json({
                                        message: 'User Created Successfully',
                                        user: newuser.email,
                                        token
                                    })
                                })



                            })
                        })
                    }
                })
            }

        }
    )
}




exports.signin = async (req, res) => {
    let userfound = await User.findOne({ email: req.body.email })
        
    if (!userfound) {
        return res.status(500).json({
            message: "Invalid Email Address"
        })
    }


    const isMatch = await bcrypt.compare(req.body.password, userfound.password)

    if (!isMatch) {
        return res.status(500).json({
            message: "Invalid Credentials"
        })
    }

    const payload = {
        user: {
            id: userfound._id,
            firstname: userfound.firstname,
            lastname: userfound.lastname,
            role: userfound.role,
            email: userfound.email

        }
    }
       
    jwt.sign(payload, SECRET, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            throw err
        }
        else {

            res.cookie('jwt', token, {httponly:true, maxAge: 10800000 });
            

            res.json({
                statusCode: 200,
                message: "Logged In Successfully",
                user: 
                {
                    firstname: userfound.firstname,
                    lastname: userfound.lastname,
                    role: userfound.role,
                    email: userfound.email
                },
                token
            })

            
            

        }
    })
}


exports.getLoggedInUser = async (req, res) => {

    try {

      const user =  await User.findById(req.user.id).select("-password")
        
        
  
      //return user details without password;
      res.status(200).json({        message: "User gotten successfully",
        user
      })

      req.user = user
  
  
    } catch (error) {
      res.status(500).send("Cant find user")
    }
  
  
}


exports.signout =  (req, res) => {
    res.cookie('jwt','', {maxAge: 1 });
    res.json({
        message: "you have been logged out"
    })
}


