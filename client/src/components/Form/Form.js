import React, {useState, useEffect} from "react";
import useStyles from './styles';
import { TextField, Button, Typography, Paper, } from "@material-ui/core";
import  FileBase  from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
  

 
const Form = ({currentId, setCurrentId}) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id == currentId): null);
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({
        
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    const dispatch = useDispatch();

    useEffect(()=>{
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}, navigate));
            
        }

        clear();

    };

    const clear = () => {
        setCurrentId(null);
        setPostData({
           
            title:'',
            message:'',
            tags:'',
            selectedFile:'',
        });
    };

    if(!user?.result?.name){
        return(
            <Paper className= {classes.paper}>
                <Typography variant='h6' align='center' style={{color: 'white'}}>
                    Please Sign In!! to share your company blog
                </Typography>
            </Paper>
        )
    }


    return (
            <Paper className={classes.paper}>
                <form autoComplete="off"
                      noValidate
                      className={`${classes.root} ${classes.form}}`}
                      onSubmit={handleSubmit}>
                    <Typography style={{ color: "Grey" }} variant='h5'><strong>{!currentId? 'Share' : 'Edit'}</strong> <span style={{fontSize: 13}}>your company experience!!!</span></Typography>
                    
                    <TextField name="title"
                               variant = 'filled'
                               className={classes.text}
                               label = 'Title'
                               fullWidth
                               value = {postData.title}
                               onChange ={(e)=>setPostData({...postData, title: e.target.value})} />
                    <TextField name="message"
                               variant = 'filled'
                               className={classes.text}
                               label = 'Message'
                               fullWidth
                               value = {postData.message}
                               onChange ={(e)=>setPostData({...postData, message: e.target.value})} />
                    <TextField name="tags"
                               variant = 'filled'
                               className={classes.text}
                               label = 'Tags'
                               fullWidth
                               value = {postData.tags}
                               onChange ={(e)=>setPostData({...postData, tags: e.target.value.split(',')})} />

                    <div className={classes.fileInput}>
                        <FileBase
                            type='file'
                            multiple= {false}
                            onDone={(base64) => setPostData({...postData,selectedFile:base64})} />
                    </div>

                    <Button 
                        className= {classes.buttonSubmit}
                        variant='contained'
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth> Submit </Button>
                    <Button 
                        variant="contained"
                        color='secondary'
                        size="small"
                        onClick ={clear}
                        fullWidth>Clear</Button>

                </form>
            </Paper>
            
        
    );
}

export default Form;