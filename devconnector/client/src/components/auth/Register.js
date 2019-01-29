import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios';
import classnames from 'classnames';

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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }


        /**we are gonna make our request in the onSubmit
         * because we submit the form
         * we are creating a user here
         * now instead of console logging, say "axios.post()"
         */

        /**it's gonna have to take some data obviously */
        axios.post('/api/users/register', newUser)
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
            .then(res => console.log(res.data))
            /**we wanna send it to the error objects in state
             * err.response.data is an actual error's object
             * and we are gonna set that to our state
             * then it's gonna show us anything, it will be said to the state
             */
            .catch(err => this.setState({ errors: err.response.data }));
    }

    render(){

        /**this is same as "const errors = this.state.errors"
         * using curly braces allows you to pull errors out of this.state
         * instead of assigning it directly
        */
        const { errors } = this.state;


        return(
            /** Register */
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <input
                            type="text"
                            /**we can put default classnames meaning these will always be in effect */
                            /** we want 'is-valid' effect when only errors.name exist
                                * then make red outline
                                * error is coming from our state
                                *
                                *    .catch(err => this.setState({ errors: err.response.data }));
                                *
                                * when we make our request, that errors object is being filled
                                * and if there is not a name, then errors.name is gonna exist
                                * and this is all because of how we set it up and our backend
                                *
                                * if(Validator.isEmpty(data.name)){
                                *   errors.name = 'Name field is required';
                                *   }
                                *
                                * it depends on which validator hits
                                * we can also check for other errors like errors.email, errors.password etc
                            */
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.name
                            })}
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={ this.onChange }
                        />
                        {/** in the future, if the bootstrap 5 is out and these classes is no longer applied with UI problem
                           * problem is nothing to do with react
                           * so i suggest using the current version*/}
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.email
                            })}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={ this.onChange }
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                      <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={ this.onChange }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':errors.password2
                            })}
                            placeholder="Confirm Password"
                            name="password2"
                            value={this.state.password2}
                            onChange={ this.onChange }
                        />
                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
                  )
    }
}

export default Register;