
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require('../models/Enduser');
const { json } = require('express');
const { SECRET } = process.env





