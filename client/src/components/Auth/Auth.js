import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const Auth = () => {
    const initialState = {firstName: '', lastName: '', email: '',password: '', confirmPassword: ''};
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isSignup,setIsSignup] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const Switch = () => {
        setIsSignup((isSignup) => !isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData));
        }else{
            dispatch(signin(formData));
        }
        console.log(formData);
    };
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const googleSuccess = async (res) => {
        
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH', data:{ result, token }});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again Later! ');
    };

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            
                        </>
                    )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type="email"/>
                    <Input name='password' label='Password' handleChange={handleChange} type="password"  />
                    {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type="password" /> }
                </Grid>

                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                    {isSignup? "Sign Up" : "Sign In" }
                </Button>

                <GoogleLogin 
                    clientId="973230571972-6mac3gg8os4e4611dr0m40r5is4f2nlo.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button
                        className={classes.googleButton}
                        color='primary'
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant = 'contained'
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                    />

                <Grid container justifyContent='flex-end' >
                    <Grid item >
                        <Button onClick={Switch} > {isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'} </Button>
                    </Grid>
                </Grid>

            </form>
        </Paper>
    </Container>
  );
};

export default Auth;
