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
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions'
/**Provider is a react component and it provides our application with the store which holds the state, data in it
 * it has to wrap around everything
 */
import { Provider } from 'react-redux';
// eslint-disable-next-line
import { createStore, applyMiddleware } from 'redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';

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
              </div>
              <Footer />
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
