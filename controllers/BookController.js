
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const Book = require('../models/Book');
const { json } = require('express');
const { SECRET } = process.env


exports.createBook = (req, res) => {
    try {
        const {title, author, category, description, imageUrl, tags } = req.body;

      let newbook =  Book.create({
                        title: title, 
                        author: author, 
                        category: category, 
                        description: description, 
                        imageUrl: imageUrl, 
                        tags: tags
                    });

        if (newbook) {
                return res.send("New book created Successfully")
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
                message: "No Books Found in this Category"
            })
        }

        res.status(200).json({
            Allbooks
        })
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

    const {title, author, category, description, imageUrl, tags } = req.body

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









