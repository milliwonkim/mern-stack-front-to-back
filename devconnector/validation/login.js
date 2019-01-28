/**it has to be a string that you are validating
 * empty has to be a string
 */
const Validator = require('validator');
const isEmpty = require('./is-empty');

/**=========================================================================== */

/**we will be able to access this function from outside */
module.exports = function validateLoginInput(data){
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

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
/**----------------------------------------------------------------------- */

    /**the problem is if your request is sent and they don't send the name,
     * it's not gonna be a empty string
     * that's what it needs to be for this isEmpty to work 
     * because that's part of the validator
     * so this needs 'data.name = !isEmpty(data.name) ? data.name : '';'
     */

/**----------------------------------------------------------------------- */

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email field is invalid';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    
/**----------------------------------------------------------------------- */
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

/**----------------------------------------------------------------------- */
    return{
        errors,
        isValid: isEmpty(errors)
    }
}