import React, {useEffect,useState} from 'react';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import {getPosts, getPostsBySearch} from '../../actions/posts';
import {useDispatch} from 'react-redux';
import { Grid, Container, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import {useLocation, useNavigate} from 'react-router-dom';
// import useStyles from '../../styles';
import Pagination from '../pagination';
import useStyles from './styles';


function useQuery(){
  return new URLSearchParams(useLocation().search);
}



const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    
    

    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleKeyPress = (e) => {
      if(e.keyCode == 13){
        searchPost();
      }
    }

    const searchPost = () => {
      if(search.trim()){
        dispatch(getPostsBySearch({ search })); //tags: tags.join(',')
        navigate(`/posts/search?searchQuery=${search || "none"}`);
      }else{
        navigate('/');
      }
    }

    return (
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position = 'static' color = 'inherit'>
                <TextField
                  name ='search'
                  variant ='outlined'
                  label ='Search Memories'
                  onKeyPress = {handleKeyPress}
                  fullWidth
                  value ={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={searchPost} className={classes.searchButton} color= 'primary' >Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper  elevation={6} className={classes.pagination}>
                <Pagination page={page}  />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
}

export default Home;