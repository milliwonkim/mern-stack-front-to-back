import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        /**if you don't wanna have to use .bind(this),
         * then you can simply write an arrow function like below
         *
         * onChange = (e) => {
         *  this.setState({ [ e.target.name ]: e.target.value })
         * }
         *
         * onSubmit = (e) => {
         *  e.preventDefault();
         *
         *  const user = {
         *      email: this.state.email,
         *      password: this.state.password
         *  };
         *
         *  console.log(user);
         * }
         */

    }

    componentWillReceiveProps(nextProps){

        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        /** we are gonna check to see if the user is authenticated
         * because remember once we log in,
         * we go to the action
         * if the log in passes with the user data, -> axios.post('/api/user/login', userData)
         * it's gonna save the token to local storage
         *      localStorage.setItem('jwtToken', token);
         *      setAuthToken(token);
         *      const decoded = jwt_decode(token);
         *
         * it's gonna set the auth token, it's gonna set the current user -> dispatch(setCurrentUser(decoded));
         * and then in the reducer, it's gonna set authenticated to true
         * because the payload will be full
         * if it passes, this will be full of what the user object
         * if they decoded user object, so 'isAuthenticated: !isEmpty(action.payload)' is true,
         * 'user: action.payload' will be the user
         */

        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e){
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        /**errors will gonna be stored in state
         * remember it's gonna come in properties from the reducer
         * and then we are gonna use that the componentWillReceiveProps to map it back to the state
        */
        // eslint-disable-next-line
        const { errors } = this.state;

        return(
        /**Login */
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            /**those gonna come from our backend API*/
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.email
                            })}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {/**those gonna come from our backend API*/}
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            /**those gonna come from our backend API*/
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {/**those gonna come from our backend API*/}
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                    </div>
                    <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

/** the second parameter is {loginUser}
 * because that is a function we want to call from the action file
 */
export default connect(mapStateToProps, { loginUser })(Login);