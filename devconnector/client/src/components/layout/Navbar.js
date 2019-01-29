/**Functional components(shortcut "rcf") should really only be used for basically dumb components
 * which don't need to use any lifecycle methods, state.
 * just display
 */

 /**this is gonna be class-based component which has shortcut "rcc" */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    /** "render" is lifecycle method that will render whatever we put here by default*/
    render(){
        return(
  /** Navbar */
  /** this is the basically our navbar of the guest version*/
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> 
              Developers
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
                Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
        )
    }
}

export default Navbar;


