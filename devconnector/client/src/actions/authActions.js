import axios from 'axios'
import { GET_ERRORS } from './types';

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
        }));
}