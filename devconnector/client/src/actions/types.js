/** that is all this file is gonna be as a collection of these
 * for instance, we will have get errors clear errors, get profile, set current user
 * that's what we will fire off when we actually log the user in
*/
/**this types.js give you an idea of what is to come in the reducer */
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
/**When we logout, we want that profile to be cleared */
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';