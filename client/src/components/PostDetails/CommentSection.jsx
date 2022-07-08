import React,{useState,useRef} from "react";
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {commentPost} from '../../actions/posts';


import useStyles from './styles';

const CommentSection =({post}) => {
    const commentsRef = useRef();
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleClick = async() => {

        const finalComment = `${user.result.name}: ${comment} `;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment("");
        commentsRef.current.scrollIntoView({behavior:'smooth'});
    };

    return(
        <div>
            <div className={classes.commentOuterContainer}>
                <div className={classes.commentInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c,i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{width: '70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button fullWidth color="primary" diabled={!comment} style={{marginTop: "10px"}} variant='contained' onClick={handleClick}>
                        Comment
                    </Button>
                </div>
                ) }
                
            </div>
        </div>
    )
}

export default CommentSection;
