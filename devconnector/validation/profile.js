/**it's gonna similar to these other ones in validation folder */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){

    let errors = {};
/**what this is doing is making sure that if it is null or undefined
 * then it's gonna get sent to an empty string
 * and then we can check it with the validator it is empty
 */
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
/**----------------------------------------------------------------------- */

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })){
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required';
    }

    /**we also have fields like website or all the social media
     * thoes aren't required but we want them to be formatted as URL
     * and we can do that with validator.URL
    */

    /**first we are gonna check to see if ti's not empty
     * because i don't want if we don't check to see if it's not empty,
     * it's gonna give us URL Error even if it's not there
     */

     if(!isEmpty(data.website)){
         if(!Validator.isURL(data.website)){
             errors.website = 'Not a valid URL'
         }
     }

     if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL'
        }
    }
/**----------------------------------------------------------------------- */
    return{
        errors,
        isValid: isEmpty(errors)
    }
}