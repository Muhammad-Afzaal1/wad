const express = require("express");
const app = express();
const db = require('./db');
const port = 3000;
const Person = require("./person")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log('Server is running');
})

app.get('/home', (req, res)=>{
    res.send('Welcome to our Hotel.');
})

app.post('/person', async(req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved.');

        res.status(201).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})

app.get('/person', async(req, res)=>{
    try{
        const response = await Person.find();
        console.log('Data fetched.');

        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal Server error."})
    }
})

