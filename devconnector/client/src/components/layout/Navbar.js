/**Functional components(shortcut "rcf") should really only be used for basically dumb components
 * which don't need to use any lifecycle methods, state.
 * just display
 */

 /**this is gonna be class-based component which has shortcut "rcc" */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component{
    /** "render" is lifecycle method that will render whatever we put here by default*/

    onLogoutClick(e){
      e.preventDefault();
      this.props.clearCurrentProfile();
      this.props.logoutUser();
    }

    render(){
      // eslint-disable-next-line
      const { isAuthenticated, user } = this.props.auth;
      // eslint-disable-next-line
      const authLinks = (
        <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>

          <li className="nav-item">
          {/** we are gonna use in <a></a> tag
             * because it's not actually gonna go anywhere */}
          {/** we don't have a constructor
             * so i'm not gonna do it up there
             * i'm just gonna do bind(this) */}
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link">
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{width: '25px', marginRight: '5px'}}
                title="You must have a Gravatar connected to your email to display an images"
              /> {''}
              Logout
            </a>
          </li>
        </ul>
      );

      // eslint-disable-next-line
      const guestLinks = (
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
      )

        return(
  /** Navbar */
  /** this is the basically our navbar of the guest version*/
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>
{/** 'Developer' is gonna be available whether we are logged in or not */}
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">
              {' '}
              Developers
            </Link>
          </li>
        </ul>
          {/** that will display either one of these 2 uls
             * it's depending on isAuthenticaed
             * which is coming from our auth property which comes from our auth state from redux*/}
          { isAuthenticated ? authLinks : guestLinks }
      </div>

    </div>
  </nav>
        )
    }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);


