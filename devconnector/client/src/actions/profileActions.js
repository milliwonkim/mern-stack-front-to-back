/**i wanna create an action or a function called "getCurrentProfile"
 * which is gonna hit the api/profile endpoint
 * that gets whatever user is logged in whatever token is sent
 * it's gonna get that user's profile
*/
import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS
} from './types';

/**Get current profile */
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        /**in here, why we type in 'GET_PROFILE' is that
         * it is not actual error like 404, 500 and so on.
         * it is just like we have no only profile
         * so payload is empty object
         * dashboard will render differently if there's not a profile
         * so that is why we are not using 'GET_ERRORS'
         */
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
    };

/**Create Profile */
/**if we wanna redirect, we have to use that with router in our component
 * and then pass in this.props.history so that we redirect
 * and we dispatch using redux thunk
 */
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                /**this is working just like our registration in login form if there's any errors*/
                payload: err.response.data
            })
        );
}

/** Profile loading */
/** with PROFILE_LOADING, we don't need to send any payload or anything
 * it's just gonna let the reducer know that it's loading.
 */
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

/** Clear Profile */
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};