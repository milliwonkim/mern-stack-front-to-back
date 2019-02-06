import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS
} from './types';

/**Add post */
/**we use dispatch because we are making an asynchronous request */
export const addPost = postData => dispatch => {
    axios
        .post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            /**this res.data will be the actual post */
            payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}