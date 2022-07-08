// import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index.js';
import { Navigate } from 'react-router-dom';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({type: "AUTH", data});

        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({type: "AUTH", data})
        Navigate('/');
    } catch (error) {
        console.log(error);
    }
}