/**it has to be a string that you are validating
 * empty has to be a string
 */
const Validator = require('validator');
const isEmpty = require('./is-empty');

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

    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
