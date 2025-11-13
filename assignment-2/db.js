const mongoose = require('mongoose')

const dbURL = 'mongodb://localhost:27017/l1f23bsse0342'

mongoose.connect(dbURL)

const db = mongoose.connection

db.on('connected', ()=>{console.log("Connected to MongoDb Server.")});
db.on('error', (err)=>{console.log("MongoDB connection error." + err)});
db.on('disconnected', ()=>{console.log("MongoDB disconnected.")})

module.exports = db;