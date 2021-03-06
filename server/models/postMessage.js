import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },

});

const postMessage = mongoose.model('PostMessage', postSchema);

export default postMessage;