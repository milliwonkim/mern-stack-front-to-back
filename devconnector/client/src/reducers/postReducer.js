import { ADD_POST, GET_POSTS, POST_LOADING } from '../actions/types';

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
            }

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                /**once that fetched, it's not loading anymore and the spinner */
                loading: false
            }

        case ADD_POST:
            return {
                ...state,
                /**we also wanna add the new post
                 * which comes in from the payload
                 */
                posts: [action.payload, ...state.posts]
            }

        default:
            return state;
    }
}
