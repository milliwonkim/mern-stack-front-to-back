import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

/**================================================================= */

/**Register User*/
/**now we are dealing with asynchronous data
 * we are fetching from our backend.
 * we have to wait for the response and then we are gonna dispatch
 * so this is where thunk middleware comes in
 * in order to do that, we have to add in the didspatch to our function
 * so put another arrow function which is the easier way to put our registerUser function
 * then dispatch function inside of it
 */
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            /**this is asynchronous call, this is where thunk comes in
             * so instead of returning, you need to say 'dispatch'
             */
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

/**Login - -Get User Token */
/**if there's only one parameter, then you can take parentheses away like below
 * export const loginUser = userData => dispatch => {}
 */
export const loginUser = userData => dispatch => {
    /**that's the route that gets the token.
     * we need to pass along our userData
     * and we need to get our response
     */
    axios.post('/api/user/login', userData)
        .then(res => {
            /**Save to localStorage */
            const { token } = res.data;
            /**Set token to ls(localStorage) 
             * 'localStorage.setItem()' will set an item in local storage only store strings
             * you can convert it to json to string store and then take it out and parse back as JSON
             * but the token we can store directly because it is actually string
             * 
            */
            localStorage.setItem('jwtToken', token);
            /** Set token to Auth Header */
            /**we have to have that authorization in the header with the token using function 'setAuthToken'
             * this function will be created at separate file
            */
           /**'token' has user information
            * so to decode this, we have to use a module called 'jwt-decode'
            */
            setAuthToken(token);
            /** Decode token to get user data */
            /** user data will be stored in 'decoded'
             * and date and expiration of the token will be stored in 'decoded'
            */
            const decoded = jwt_decode(token);
            /**Set current user */
            /**what i'm gonna do is to create a separate function
             * to do this and dispatch to it
             */
            dispatch(setCurrentUser(decoded));


        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

/**Set logged in user */
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        /**'decoded' is the actual user along with the token information the expiration and so on */
        payload: decoded
    }
}