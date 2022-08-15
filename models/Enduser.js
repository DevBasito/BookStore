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
        userRole: {
            type: String,
            enum: ['user', 'staff', 'manager', 'admin', 'not assigned'],
            default: 'not assigned'
        },
        isStaff: {
            type: Boolean,
            default: 0
        },
        isManager: {
            type: Boolean,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: 0
        }
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('EndUser', EnduserSchema)