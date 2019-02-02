import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    /** the reason of "loading: false" is
     * because we are gonna be fetching profiles
     * so loading will be false
     * while fetching, i want this to be true
     * and then once they are fetched and we have them this will be false again
     * so we can use this inside of our component to show a little spinner
     * if it's still fetching if it's still loading*/
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){

        case PROFILE_LOADING:
            return{
                /** '...state' means current profile(state) */
                ...state,
                loading: true
            };

        case GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: false
            };

        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }

        default:
            return state;
    }
}