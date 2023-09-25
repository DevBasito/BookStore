
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');


const Book = require('../models/Book');
const Order = require('../models/Orders');
const { json } = require('express');
const { SECRET, EMAIL_USER, EMAIL_PASSWORD } = process.env


const transporter = nodemailer.createTransport({

    host: "smtp.elasticemail.com",
    port: 2525,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: true
    }
});


exports.createBook = (req, res) => {
    try {
        const { title, author, category, description, imageUrl, price, tags } = req.body;

        let newbook = Book.create({
            title: title,
            author: author,
            category: category,
            description: description,
            imageUrl: imageUrl,
            price: price,
            tags: tags
        });

        if (newbook) {
            return res.json({
                message: "New book created Successfully"
            })
        } else {
            return res.send("Error")
        }



    } catch (error) {
        throw error
    }
}



exports.getAllBooks = (req, res) => {

    Book.find({}, (err, Allbooks) => {
        if (err) {
            return res.status(500).json({
                message: "No Books Available in this Category"
            })
        }

        res.status(200).json(
            Allbooks
        )
    }).sort({ "title": 1 })

}

exports.getAvailableBooks = (req, res) => {

    Book.find({ available_yn: true }, (err, Availablebooks) => {
        if (err) {
            return res.status(500).json({
                message: "No Books Available at the Moment"
            })
        }

        res.status(200).json(
            Availablebooks
        )
    })

}


exports.getBooksByCategory = (req, res) => {

    const { category } = req.body

    Book.find({ category: category }, (err, Categorybooks) => {
        if (err) {
            return res.status(500).json({
                message: "No Books Found in this Category"
            })
        }

        res.status(200).json(
            Categorybooks
        )
    })

}

exports.getBookById = (req, res) => {

    const { id } = req.params

    Book.find({ _id: id }, (err, BookById) => {
        if (err) {
            return res.status(500).json({
                message: "This Book Doesnt Exist in the System"
            })
        }

        res.status(200).json(
            BookById
        )
    })

}

exports.DoUpdateBook = async (req, res) => {

    const { id, title, author, category, description, imageUrl, price, available_yn, tags } = req.body

    let book = await Book.findOne({ _id: id })


    if (!book) {
        return res.status(500).json({
            message: "Book not found"
        })
    }

    Book.findByIdAndUpdate(book._id,
        {
            title: title,
            author: author,
            category: category,
            description: description,
            imageUrl: imageUrl,
            price: price,
            available_yn: available_yn,
            tags: tags
        },
        (err, bookUpdated) => {
            if (err) {
                return res.status(500).json({
                    message: "Cannot Update Book"
                })
            }

            res.status(200).json({
                bookUpdated,
                message: "Book Updated Successfully"
            })
        })

}

exports.DoDeleteBook = async (req, res) => {

    const { id, title, author, category, description, imageUrl, tags } = req.body

    let book = await Book.findOne({ _id: id })


    if (!book) {
        return res.status(500).json({
            message: "Book not found"
        })
    }

    Book.findByIdAndDelete(book._id,
        (err, bookDeleted) => {
            if (err) {
                return res.status(500).json({
                    message: "Cannot Delete Book"
                })
            }

            res.status(200).json({
                bookDeleted
            })
        })

}

exports.bookOrder = (req, res) => {
    try {
        const { fullname, email, address, phone, amount, order_ref, products, quantity, payment_yn, is_delivered} = req.body;

        let neworder = Order.create({
            fullname: fullname,
            email: email,
            address: address,
            phone: phone,
            amount: amount,
            order_ref: order_ref,
            products: products,
            quantity: quantity,
            payment_yn: payment_yn,
            is_delivered: is_delivered
        });

        if (neworder) {
            return res.json({
                order: "placed",
                message: "Your Book Order has been placed successfully, You will receive a confirmation email and our customer rep will contact you soon, Thanks for your patronage"
            })
        } else {
            return res.send("Error")
        }
        

        let message = {
                        from: "vampbaxx@gmail.com",
                        to: email,
                        subject: `Bookccentric Order ${order_ref}`,
                        text: 'YOU ARE BEING HACKED BY ANONYMOUS FROM THE DARK WEB. YOUR SECRETS ARE SAFE WITH ME (NOT). YOUR BANK ACCOUNT AND BVN ARE BEING SIPHONED AS WE SPEAK - XOXO DARTH'
                    };

        transporter.sendMail(message, () => {
                        console.log('Mail sent successfully')
                    });             


    } catch (error) {
        throw error
    }
}

exports.getOrders = (req, res) => {

    Order.find({}, (err, Orderlist) => {
        if (err) {
            return res.status(500).json({
                message: "Orders not found"
            })
        }

        res.status(200).json(
            Orderlist
        )
    }).sort({ "createdAt": -1 })

}










