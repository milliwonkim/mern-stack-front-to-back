/**this is for preventing us from having to manually make sure we have the token for each request that we need 
 * if we are logged in, we can call this function and it's gonna always attach that authorization header
 * this is what axios need for
*/
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        /**Apply every request */
        /**the header value we want is 'Authorization'
         * remember when we use postman, we used authorization
         * and then we just wanna set that equal to the token
         */
        axios.defaults.headers.common['Authorization'] = token;
    } else{
        /**Delete Auth Header */
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;