import { ADD_POST } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){

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