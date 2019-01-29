/**it has to be a string that you are validating
 * empty has to be a string
 */
const Validator = require('validator');
const isEmpty = require('./is-empty');

/**=========================================================================== */

/**we will be able to access this function from outside */
module.exports = function validatePostInput(data){
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
    /**Nothing else is gonna be empty
     * because the avatar the name of that stuff that's comming in programatically
     * so it's not gonna be possible for it to be empty
     * so we don't have to check that so we check only text
     */
    data.text = !isEmpty(data.text) ? data.text : '';
/**----------------------------------------------------------------------- */

    if(!Validator.isLength(data.text, { min: 10, max: 300 })){
        errors.text = 'Post must be between 10 and 300 characters';
    }

    /**the problem is if your request is sent and they don't send the name,
     * it's not gonna be a empty string
     * that's what it needs to be for this isEmpty to work
     * because that's part of the validator
     * so this needs 'data.name = !isEmpty(data.name) ? data.name : '';'
     */

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is invalid';
    }

/**----------------------------------------------------------------------- */
    return{
        errors,
        isValid: isEmpty(errors)
    }
}