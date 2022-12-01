const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        purchaseCount: {
            type: Number,
            required: true,
            default: 0
        },
        imageUrl: {
            type: String,
            required: true
        },
        tags: {
            type: Array
        }    
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Book', BookSchema)