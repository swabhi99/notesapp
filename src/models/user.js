const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
       type:String
    },

    username:{
        type:String,
    
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
       type:String,
     
       trim:true
    }
})
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    
    return userObject
}

userSchema.plugin(passportLocalMongoose)



const User = new mongoose.model('User',userSchema)



module.exports= User
