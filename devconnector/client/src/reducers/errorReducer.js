import { GET_ERRORS } from '../actions/types';

const initialState = {
    /**reference to Redux chrome extension */
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    /**we are gonna dispatch actions to this reducer 
     * and then this is where we do the testing which will use 'switch()' the standard javascript function
     * 
     * action is the object that is gonna include 'type'
     * so you can also send the payload, you can send data along with it
    */
    switch(action.type){
        case GET_ERRORS:
        /** action.payload comes from authActions.js 'err.response.data' 
         * what we are doing is just putting it into redux store
        */
            return action.payload
        default:
            return state;
    }
}