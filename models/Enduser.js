const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const EnduserSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'manager'],
            default: 'user'
        },
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('EndUser', EnduserSchema)