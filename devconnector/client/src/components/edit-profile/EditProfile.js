import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
/** if the user doesn't have a website filled in their profile,
 * we need to check that
 * if it's not, we need to add an empty string
*/
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            /**we wanna be able to toggle those by default
             * so it's gonna be false
            */

            /**we gonna do the same thing like
             * we did with the log in and registration
             * where we get the errors from the state,
             * and put them into from the redux state
             * and put them into our components state
             */

            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            vio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    /** it's gonna fetch the profile
     * because when the component mount, and then it will come in through the 'state.profile' of 'mapStateToProps'
     * then maybe we will able to access it through our properties
     * then componentWillReceiveProps is gonna run,
     * and check for the profile,
     * we are gonna set this variables profile
     * so we can access all the fields
     * and we gonna turn the skills back into a string array or if not, turn into a empty string
     * then finally we gonna set the state of the values which should fill the forms
    */

    /**'componentDidMount' run as soon as the component mount */
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            /**this will fill the state,
             * we are taking the errors out of the state,
             * and if there are any errors,
             * they should display in the field
             */
            this.setState({errors: nextProps.errors});
        }
        /**this is the actual profile state
         * and then we want profile object that is inside of the state
         */
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            /**Bring skills array back to comma-separated value */
            const skillsCSV = profile.skills.join(',');

            /** if profile field doesn't exist, make empty string*/
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {} ;
                profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
                profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
                profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
                profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
                profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            
            /**Set component fields state */
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
        }
    }

    onSubmit(e){
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        /**we are getting everything in the form
         * and we are calling create profile again just like we did in CreateProfile component
         * that's what we wanna do because that calls the endpoint
         * which will do both create and update our profile
         *
         * we also have our errors coming in,
         * we did that in the create Profile and we just copied that entire file -> errors: state.errors
          */
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const { errors, displaySocialInputs } = this.state;

        /**we don't need 'else'
         * because if the 'displaySocialInputs' is false,
         * then it's gonna be null, it's gonna be nothing
        */

        let socialInputs;
        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                </div>
            )
        }

        /**Select options for status */
        const options = [
            /**This is basically gonna be like the title of the default */
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                        <Link to="/dashboard" className="btn btn-light">
                                Go Back
                        </Link>

                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pd-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />

                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Give us an idea of where you are at in your career"
                                />

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />

                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own company or one you work for"
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />

                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)"
                                />

                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="if you want your latest repos and a Github link, include your username"
                                />

                                <TextFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                        this.setState(prevState => ({
                                            /** !prevState.displaySocialInputs means "not displaySocialInputs of previous state"
                                              * it's gonna toggle 'displaySocialInputs'*/
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                { socialInputs }
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(CreateProfile)
);
