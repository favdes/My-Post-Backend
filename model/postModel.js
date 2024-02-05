const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:[true,'Please enter a title'],
        unique:true
    },
    tags:{
        type:String,
        required:true,
        enum:['Technology','Nature','Lifestyle',"Entertainment"],
    },
    description:{
        type:String,
        required:[true,'please enter a post description']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true

    }
    // image:{
    //     type:String,
    //     required:[true,'please select an image']
    // }

},{timestamps:true})

const POSTS = mongoose.model('POST',postSchema);
module.exports = POSTS