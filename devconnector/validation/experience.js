/**it has to be a string that you are validating
 * empty has to be a string
 */
const Validator = require('validator');
const isEmpty = require('./is-empty');

/**=========================================================================== */

/**we will be able to access this function from outside */
module.exports = function validateExperienceInput(data){
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

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    /**the problem is if your request is sent and they don't send the name,
     * it's not gonna be a empty string
     * that's what it needs to be for this isEmpty to work 
     * because that's part of the validator
     * so this needs 'data.name = !isEmpty(data.name) ? data.name : '';'
     */

/**----------------------------------------------------------------------- */

    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title field is required';
    }

    if(Validator.isEmpty(data.company)){
        errors.company = 'Company field is required';
    }

    if(Validator.isEmpty(data.from)){
        errors.from = 'From date field is required';
    }
/**----------------------------------------------------------------------- */
    return{
        errors,
        isValid: isEmpty(errors)
    };
};