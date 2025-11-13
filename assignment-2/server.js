const express = require('express')
const db = require('./db')
const Member = require('./models/Member')
const Book = require('./models/Book')
const bodyParser = require('body-parser')

const app = express()
const port = 3000;
app.use(bodyParser.json())


app.listen(port, ()=>{
    console.log('server is running')
})

app.post('/lms/books', async(req, res)=>{
    try{
        const data = req.body;
        const newBook = new Book(data);
        const response = await newBook.save()
        console.log('Book is saved.')
        res.status(201).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in books'});
    }
})

app.post('/lms/members', async(req, res)=>{
    try{
        const data = req.body;
        const newMember = new Member(data);
        const response = await newMember.save()
        console.log('Member is saved.')
        res.status(201).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in post memebers'});
    }
})

app.get('/lms/books', async(req, res)=>{
    try{
        const response = await Book.find()
        console.log('Books data is fetched');
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get books'});
    }
})

app.get('/lms/members', async(req, res)=>{
    try{
        const response = await Member.find()
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Member data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get members'});
    }
})


app.get('/lms/books/issued', async(req, res)=>{
    try{
        const response = await Book.find(
            {isAvailable:false},
            {title:1, _id:0}
        )
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Book data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get available Book'});
    }
})

app.get('/lms/books/genre/:type', async(req, res)=>{
    try{
        const type = req.params.type;
        const response = await Book.find({genre:type})
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Book data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get genre type Book'});
    }
})

app.get('/lms/members/recent', async(req, res)=>{
    try{
        const sixtyDaysAgo = new Date()
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)
        response = await Member.find({joinedDate: {$gte:sixtyDaysAgo}})
        if(!response){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Member data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get members'});
    }
})


app.get('/lms/members/role/:role', async(req, res)=>{
    try{
        const role = req.params.role;
        const response = await Member.find({role:role})
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Member data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get members'});
    }
})

app.get('/lms/books/available', async(req, res)=>{
    try{
        const {genre, publishedYear} = req.query;
        const filter = {isAvailable:true}
        if (genre){
            filter.genre = genre;
        }
        if(publishedYear){
            filter.publishedYear = parseInt (publishedYear);
        }
        const response = await Book.find(filter)

        if(!response || response.length === 0){
            res.status(404).json({error:"No books found matching this criteria."})
        }
        console.log('Book data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get available Book'});
    }
})

app.get('/lms/books/available', async(req, res)=>{
    try{
        const response = await Book.find({isAvailable:true})
        if(!response || response.length === 0){
            res.status(404).json({error:"Resource not found"})
        }
        console.log('Book data is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error in get available Book'});
    }
})