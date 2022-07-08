import React,{useState,useEffect} from 'react';
import {AppBar, Typography, Toolbar, Button, Avatar} from "@material-ui/core";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import useStyles from "./styles";
import logo from '../../images/logo.png'
const Navbar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({type:'LOGOUT'});

        navigate('/');
        setUser(null);
    };

    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location]);

    return(
        <AppBar className={classes.appBar} position= 'static' color='inherit'>
            <div className={classes.brandContainer}> 
                <img className={classes.image} src={logo} alt='img' height ="60" />&nbsp;&nbsp;&nbsp;
                <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Company Hunt</Typography>
            </div>

                <Toolbar className={classes.toolbar}>
                    { user? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button variant='outlined' className={classes.logout} color='secondary' onClick={logout}>LogOut</Button>
                        </div>
                    ) :(
                        <Button component={Link} to='/auth' variant='contained' color=''>Sign In</Button>
                    )}
                </Toolbar>
            
            
        </AppBar>
    );
  
};

export default Navbar;
