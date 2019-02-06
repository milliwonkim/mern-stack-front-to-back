import isEmpty from '../validation/is-empty'

import { SET_CURRENT_USER } from '../actions/types';

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
        case SET_CURRENT_USER:
            return {
                /**return current state and authenticated */
                ...state,
                /**if that's filled with decoded user,
                 * that means it should be authenticated
                 * if not, it's an empty object
                 * then we shouldn't be authenticated
                 * and then the user is gonna be the actual.payload itself
                 * 'isEmpty' doesn't exist, we are gonna use that same is empty that we used on the server side
                 * 
                */ 
                isAuthenticated: !isEmpty(action.payload),
                /**'user' is the actual payload */
                /**the way when we wanna log out, we wanna clear the user
                 * or we can simply call this again
                 * and we can pass in empty object as payload
                 * then they won't be authenticated and the user will go back to being an empty object
                 */
                user: action.payload
            }
        default:
            return state;
    }
}