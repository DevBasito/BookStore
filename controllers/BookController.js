
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const Book = require('../models/Book');
const { json } = require('express');
const { SECRET } = process.env


exports.createBook = (req, res) => {
    try {
        const {title, author, category, description, imageUrl, price, tags } = req.body;

      let newbook =  Book.create({
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
    }).sort({"title":1})

}

exports.getAvailableBooks = (req, res) => {

    Book.find({available_yn:"Yes"}, (err, Availablebooks) => {
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

    const {category} = req.body
   
    Book.find({category:category}, (err, Categorybooks) => {
        if (err) {
            return res.status(500).json({
                message: "No Books Found in this Category"
            })
        }

        res.status(200).json({
            Categorybooks
        })
    })

}

exports.DoUpdateBook = async (req, res) => {

    const {title, author, category, description, imageUrl, price, available_yn, tags } = req.body

    let book = await Book.findOne({title:title})


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
            bookUpdated
        })
    })

}

exports.DoDeleteBook = async (req, res) => {

    const {title, author, category, description, imageUrl, tags } = req.body

    let book = await Book.findOne({title:title})


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









