import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

/**================================================================================ */

const initialState = {};

const middleware = [thunk];

/** "...middleware" bring thunk.
 * so we are gonna bring in thunk
 * and then any other middleware that we want to add to middleware array
 */

 const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        /** this is need to implement the extension and show us what we need to see */
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;