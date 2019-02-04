import React, { Component } from 'react';
/**when we submit the form to an experience,
 * i just wanna redirect
 * so if we wanna redirect from an action that we need to use 'withRouter'
 */
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {

    constructor(props){
        super(props);

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            /**the reason of 'disabled: false' is that
             * if they click the current checkbox,
             * then i wanna disabled to be true
             * and then that's gonna black 'to' field
             */
            disable: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };
        /**we can access to that in action
         * and able to do that
         * because we brought in withRouter from our react-router-dom
         * and then we wrapped 'AddExperience' with 'withRouter'
         */
        this.props.addExperience(expData, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    /**we wanna change the disabled state
     * and we wanna change current to the opposite of whatever it is
     * if this is true, then we wanna change to false
     * 
     */
    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render(){

        /** this is same as below
         *
         * const errors = this.state.errors;
        */
        const { errors } = this.state;

        return(
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                            <small className="d-block pd-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />

                                <TextFieldGroup
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />

                                <h6>From Date</h6>

                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />

                                <h6>To Date</h6>

                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    /**we need to change the state on the current checkbox*/
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />

                                <form className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    {/** in React, you can't use 'for' attribute with your label*/}
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                    <TextAreaFieldGroup
                                        placeholder="Job Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        error={errors.description}
                                        info="Tell us about the position"
                                    />
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-info btn-block mt-4"
                                    />
                                </form>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));