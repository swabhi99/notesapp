const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'User'
  
  }
})
const Task = mongoose.model('Task',taskSchema)



module.exports=Task