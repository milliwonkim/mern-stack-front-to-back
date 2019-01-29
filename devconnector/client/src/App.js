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

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './App.css';

/**================================================================================ */
class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
