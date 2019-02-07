import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    POST_LOADING
} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case POST_LOADING:
            return{
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                /**once that fetched, it's not loading anymore and the spinner */
                loading: false
            };
        case GET_POST:
            return{
                ...state,
                post: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                /**we also wanna add the new post
                 * which comes in from the payload
                 */
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state;
    }
}