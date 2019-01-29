import { combineReducers } from 'redux';
import authReducer from './authReducer';

/**================================================================================ */

export default combineReducers({
    /**we can simply put in object with our reducers
     * we can call whatever you want, i call it 'auth' and send it to the authorReducer
     * so when we use anything from our authReducer in our components, will use this.props.auth
     */
    auth: authReducer
})