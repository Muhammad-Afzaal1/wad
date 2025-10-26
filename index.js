const express = require('express')
const libraryBooks = require('./data')
const _ = require('lodash')
const app = express()
const port = 3000

app.listen(port, ()=>{
    console.log('server is running')
})



app.get('/api/books/', (req, res)=>{
    author = req.query.author
    let books;
    if (author){
        books = libraryBooks.libraryBooks.filter(book => book.author == author)
    }else{
        books = libraryBooks.libraryBooks
    }
    
    res.send(books)
})

app.get('/api/books/available', (req, res)=>{
    const availableBooks = libraryBooks.libraryBooks.filter(book => book.is_available == true)
    res.send(availableBooks)
})

app.get('/api/books/issued', (req, res)=>{
    const issuedBooks = libraryBooks.libraryBooks.filter(book => !book.is_available)
    res.send(issuedBooks)
})
