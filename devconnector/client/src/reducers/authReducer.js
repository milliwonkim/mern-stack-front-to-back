import { TEST_DISPATCH } from '../actions/types';

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
        case TEST_DISPATCH:
            return {
                /**remember we don't change the state or mutate the state 
                 * we make a copy of it so we wanna take the initial state
                */
               ...state,
               /**this gonna fill 'user: {}' in the initialState with that payload which is userData in authActions.js */
               user: action.payload
            }
        default:
            return state;
    }
}