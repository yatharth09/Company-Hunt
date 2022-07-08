import express from 'express';
import {commentPost, getPostsBySearch, getPosts,createPosts,updatePosts,deletePost,likePost, getPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePosts);
router.delete('/:id', auth ,deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/:id', getPost);
router.post('/:id/commentPost', auth, commentPost);

export default router;