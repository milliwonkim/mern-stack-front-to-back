/**it has to be a string that you are validating
 * empty has to be a string
 */
const Validator = require('validator');
const isEmpty = require('./is-empty');

/**=========================================================================== */

/**we will be able to access this function from outside */
module.exports = function validateRegisterInput(data){
    /** we start off with an empty errors
     * and if everything passes it will still be empty at the end
     * and it will be valid
     * if not then "errors.name" will get filled and then it won't be empty
     * and it won't be valid
     * and
     * if(!isValid){ return res.status(400).json(errors); }
     * this will return all the errors
    */
    let errors = {};

    /**what we wanna do is if we are testing for something to be empty
     * we first need it to be an empty string
     */

    data.name = !isEmpty(data.name) ? data.name : '';

    /**we are gonna have a field called password2
     * which is not used on the server
     * but we still wanna validate that
     * make sure that it's actually being sent
     * because even though this stuff we are putting on the server
     * these responses these tasks are gonna be run from the client
     * the client is gonna go through the server and get sent back to the client
     */

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

/**----------------------------------------------------------------------- */

    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    /**the problem is if your request is sent and they don't send the name,
     * it's not gonna be a empty string
     * that's what it needs to be for this isEmpty to work 
     * because that's part of the validator
     * so this needs 'data.name = !isEmpty(data.name) ? data.name : '';'
     */

    if(Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }
/**----------------------------------------------------------------------- */
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }
/**----------------------------------------------------------------------- */
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, { min: 6, max: 30 })){
        errors.password = 'Password must be at least 6 characters';
    }
/**----------------------------------------------------------------------- */
    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}