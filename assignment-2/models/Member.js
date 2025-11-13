const mongoose = require('mongoose')

const memeberSchema = mongoose.Schema({
    memberID:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    department:{
        type:String,
        required:false,
    },
    joinedDate:{
        type:Date,
        default:Date.now
    }, 
    isActive:{
        type:Boolean,
        default:true,
    },
    role:{
        type:String,
        required:true,
        enum: ["student", "faculty"]
    },
    gender:{
        type:String,
        required:false
    }
})


const Member = mongoose.model('Member', memeberSchema, 'Member')

module.exports = Member;