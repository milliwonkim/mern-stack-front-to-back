import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING
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

/**Get post */
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            /**this res.data will be the actual post */
            payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
}

/**Set loading state */
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}