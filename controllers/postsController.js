const POSTS = require('../model/postModel');
const cloudinary = require('cloudinary').v2

// create -- C 

const createPost = async(req,res)=>{
    req.body.createdBy = req.user.userId
    // const {id} = req.user
    try {
        // const {secure_url} = await cloudinary.uploader.upload(
        //     req.files.image.tempFilePath,
        //     {
        //       use_filename:true ,
        //       folder:"storiesAsset" 
        //     }
        // )

        // req.body.image = secure_url
        // req.body.createdBy = id
        const post = await POSTS.create({...req.body});
        res.status(201).json({message:"post created successfully",post})
        
    } catch (error) {
        res.status(500).json({error})
    }
}
// get all routes
const getAllDesc = async (req,res)=>{
   try{
    const allPosts = await POSTS.find({}).populate('createdBy')
    res.status(200).json({msg: 'all posts', allPosts})
   }catch(error){
    res.json({error});
   }
}

//   single post for a user
const getAPost = async(req,res)=>{
    const {postId} = req.params;
    try{
        const post = await POSTS.findById({_id:postId}).populate("createdBy");
        res.status(200).json({msg: 'a users post', post})

    }catch(error){
        res.json({error});
       }
}
//   get all posts by a user

const getAllPostsByUser = async (req,res)=>{
    const {userId} = req.user 
    try{
        const posts = await POSTS.find({createdBy:userId}).getPopulate('createdBy');
        res.status(200).json({msg:'user posts', posts})
    }catch(error){
        res.json({error})
    }
}
// delete a users post
const deleteUserPost = async(req,res)=>{
    const {postId} =req.params;
    const {userId} = req.user;

    try{
        const post = await POSTS.findOneAndDelete({_id:postId,createdBy:userId});
        res.status(200).json({msg:'delete successfully', post})
    }catch(error){
        res.json({error})
    }

}

module.exports ={
     createPost,
     getAllDesc,
     getAPost,
     getAllPostsByUser,
     deleteUserPost



}