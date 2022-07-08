import mongoose from 'mongoose';
import postMessage from "../models/postMessage.js";


export const getPosts = async (req,res) => {
    const {page} =req.query;
        try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1)* LIMIT;
        const total = await postMessage.countDocuments({});

        const posts = await postMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        

        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch =async (req,res) => {
    const {searchQuery} = req.query;
    
    try {
        const title = new RegExp(searchQuery, 'i'); // TEST = Test = test == test
        const posts = await postMessage.find({title});
        res.json({data: posts});
    } catch (error) {
        console.log(error);
    }
}

export const createPosts = async ( req, res)=> {
    const post = req.body;
    post.selectedFile=req.body.selectedFile.base64;
    
    const newPost = new postMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePosts = async (req,res) => {
    const {id:_id} = req.params;
    const post = req.body;
    if(req.body.selectedFile){
        post.selectedFile=req.body.selectedFile.base64;
    }
    

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, { new:true });
    
}

export const deletePost = async (req,res) => {
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    await postMessage.findByIdAndRemove(_id);

    res.json({message: 'post deleted successfully'});
}

export const likePost = async (req, res) => {
    const{id:_id} = req.params;
    if(!req.userId) return res.json({message: 'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const post = await postMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new:true});
    res.json(updatedPost);

    
}

export const getPost = async (req,res) => {
    const {id} = req.params;
    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = async (req,res) => {
    const { id }  = req.params;
    const {value} = req.body;

    const post = await postMessage.findById(id);

    post.comments.push(value);
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new:true});
    res.json(updatedPost);

}