import { TEST_DISPATCH } from './types';

/**Register User*/
export const registerUser = (userData) => {
    return {
        /**i have anything else but at least it has to have a type
         * 
         * the 'userData' gets passed into this action(registeruser) which actually action creator
         * and we will dispatch payload to the reducer along with that userData
         */
        type: TEST_DISPATCH,
        payload: userData
    }
}