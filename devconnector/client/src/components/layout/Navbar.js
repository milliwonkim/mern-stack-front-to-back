/**Functional components(shortcut "rcf") should really only be used for basically dumb components
 * which don't need to use any lifecycle methods, state.
 * just display
 */

 /**this is gonna be class-based component which has shortcut "rcc" */
import React, { Component } from 'react';

class Navbar extends Component{
    /** "render" is lifecycle method that will render whatever we put here by default*/
    render(){
        return(
  /** Navbar */
  /** this is the basically our navbar of the guest version*/
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html">DevConnector</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="profiles.html"> Developers
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="register.html">Sign Up</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login.html">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
        )
    }
}

export default Navbar;


