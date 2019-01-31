import React, { Component } from 'react'
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line
import axios from 'axios';
import classnames from 'classnames';
// eslint-disable-next-line
/** 'connect' is used for just connecting redux to this component*/
// eslint-disable-next-line
import { connect } from 'react-redux';
// eslint-disable-next-line
import { registerUser } from  '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    /** the react lifecycle method 'componentWillReceiveProps' will receive props
     * this runs when your component receive new properties,
    */
    componentWillReceiveProps(nextProps){
        /**what we do in here is to test to see if we can test for certain properties */
        if(nextProps.errors){
            /**so that way, we get the errors from our redux state
             * it gets put into props with mapStateToProps
             * and then once we receive new properties and if errors is included
             * then we are gonna set it to the components state
             * so that way we don't have to change anything that we already did
             * because it's coming from the area 
             * are still gonna be coming from the component state 'const { errors } = this.state;'
             */
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        /**The point of this is whenever the user types,
         * it's gonna fire off the function
         * and we wanna set whatever is put into that input to the state variable
         */
        /**whatever the user types, we can get from 'e.target.value' */
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
// eslint-disable-next-line
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        /** now any actions that we bring in
         * we call through the props
         * it's gonna be stored in there
         * so this.props.registerUser();
        */

        /**this allows us to redirect from within this action
         * because within the authAction, we cannot just say this.props.history without withRouter in the component
         */
        this.props.registerUser(newUser, this.props.history);


        /**we are gonna make our request in the onSubmit
         * because we submit the form
         * we are creating a user here
         * now instead of console logging, say "axios.post()"
         */

        /**it's gonna have to take some data obviously */
            /**in here, res means result */
            /**"res.data" will give us the actual data
             * because remember when we register a user,
             * gives us user back and we can check that real quick
             * if we go to our routes and our backend users
             *
             *      .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));

             * once it saves everything, checks out it's gonna save
             * and it's gonna respond with the user
             * and if something goes wrong, there's an error, it's gonna respond with the error
             *
             * notice we don't have to do the localhost:5000 because we put that proxy value in our package.json
             */
            /**we wanna send it to the error objects in state
             * err.response.data is an actual error's object
             * and we are gonna set that to our state
             * then it's gonna show us anything, it will be said to the state
             */

    }

    render(){

        /**this is same as "const errors = this.state.errors"
         * using curly braces allows you to pull errors out of this.state
         * instead of assigning it directly
        */
        const { errors } = this.state;

        /**this is same as 'const user = this.props.auth.user' */

        return(
            /** Register */
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate onSubmit={ this.onSubmit }>

                    <TextFieldGroup 
                            placeholder="Name"
                            name="name"
                            /** if 'type="text"', we don't need type in 'type'
                              * because the default of type is 'text' */
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                    />

                    <TextFieldGroup 
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup 
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup 
                            placeholder="Confirm Password"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
                  )
    }
}
/**we wanna include our prop Types and this is react thing
 * any property you have in your component, you shoyld map to prop types
*/
Register.propTypes = {
    /**remember registerUser it's an action
     * but it's also property
     *
     * func means function
     */
    /** auth is also property of this component
     */
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

/**if we wanna get any state into our component,
 * then we have to create a function called 'mapStateToProps'
 */
const mapStateToProps = (state) => ({
    /**what it is doing is putting the auth state inside a property called auth
     * so we can access it with 'this.props.auth'
     *
     * 'auth' on the right side is come from rootReducer
     * 'auth' on the left side could be named whatever you want
    */
    auth:state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    /**second parameter is gonna be an object where we can map our actions*/
    { registerUser }
)(withRouter(Register));