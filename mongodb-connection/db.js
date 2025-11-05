const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/myHotelDB";

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{console.log("Connected to MongoDb Server.")});
db.on('error', (err)=>{console.log("MongoDB connection error." + err)});
db.on('disconnected', ()=>{console.log("MongoDB disconnected.")})

module.exports = db;