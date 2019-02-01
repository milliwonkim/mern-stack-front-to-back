/**This is basically gonna be the meeting place for everything that we do
 * Sometimes people do it in the index just as well
 * but i noticed that when you use create-react-app, most people do in App.js
*/
import React, { Component } from 'react';
/** "BrowserRouter" is gonna mimic just a standard server
 * it will be able to back button to go to the route that we were just add thing like that
 * use the browser back and forward buttons
*/
/**you don't need to be like "BrowserRouter as Router"
 * but i wanna be able to say router down here instead of browserRouter
 */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
/**Provider is a react component and it provides our application with the store which holds the state, data in it
 * it has to wrap around everything
 */
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
// eslint-disable-next-line
import { createStore, applyMiddleware } from 'redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';

/**================================================================================ */

/**Check for token */
/**but we have an issue
 * and that is that if the page is reloaded,
 * then all goes away
 * so if i reload the page,
 * and we take a look at our state, 'isAuthenticated' is false
 * so we need add some logics to App.js of client */
if(localStorage.jwtToken){
  /**Set auth token header auth */
  setAuthToken(localStorage.jwtToken);
  /**Decode token and get user info and exp */
  /**we are doing mostly the same stuff within that login action
   * except that we are checking for this with every single page request to make sure the users logged in or not
    * to check if they are logged in or not*/
  const decoded = jwt_decode(localStorage.jwtToken);
  /**Set user and isAuthenticated */
  /**we can call any actions in our store using 'store.dispatch()'  */
  store.dispatch(setCurrentUser(decoded));

  /** Check for expired token */
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    /**Logout User */
    store.dispatch(logoutUser());
    /**Clear current Profile */
    store.dispatch(clearCurrentProfile());
    /** Redirect to login */
    window.location.href = '/login';

  }
}
class App extends Component {
  render() {
    return (
      <Provider store={ store }>
          <Router>
            <div className="App">
              <Navbar />
              {/**
                it will actually show content from multiple route on the same page.
                we don't want that
                for instance, if we have another route like '/log',
                it will also show the landing component because landing component also has /
              */}
              {/**
                so make sure the exact path goes to that exact component like home
              */}
              {/**The Landing component is only component that i wanna go across the whole screen
              because it has a background image
              so except the Landing page, i use <div="container"></div>*/}
              <Route exact path='/' component={ Landing } />
              <div className="container">
                  <Route exact path='/register' component={ Register }/>
                  <Route exact path='/login' component={ Login }/>
                  {/** we are gonna have an issue with redirect
                     * unless we bring in 'Switch' from the react-router-dom
                     * that's gonna prevent some strange redirection issue*/}
                  <Switch>
                      <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
                  </Switch>
                  <Switch>
                      <PrivateRoute
                          exact
                          path='/create-profile'
                          component={ CreateProfile }
                      />
                  </Switch>
              </div>
              <Footer />
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
