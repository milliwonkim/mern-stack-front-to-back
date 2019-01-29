/**This is my is-empty function that will check for a undefined, null, empty object, empty string
 * as opposed to the validator, is-empty which is only gonna check for empty string
*/
const isEmpty = value =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);

/**above is equal to this below
 *
 * function isEmpty(value){
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
} */

module.exports = isEmpty;