const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        payment_yn: {
            type: Boolean,
            default: false
        },
        order_ref: {
            type: String,
            required: true
        },
        products: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        is_delivered: {
            type: Boolean,
            default: false
        },
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Orders', OrderSchema)