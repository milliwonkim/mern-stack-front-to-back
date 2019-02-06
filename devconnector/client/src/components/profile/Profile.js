/**This is basically gonna be like the container for the rest of the parts of the profile
 * like the Header, or About section, the credentials and then the github section etc */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {

    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render(){

        const { profile, loading } = this.props.profile;
        let profileContent;

        if(profile === null || loading){
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    {/** we don't have to use redux to fetch the profile from within the header
                       * because it's just a sub-component we are passing it down from this component */}
                    <ProfileHeader profile={ profile } />
                    <ProfileAbout  profile={ profile }/>
                    <ProfileCreds
                        education={ profile.education }
                        experience={ profile.experience }
                    />
                    <ProfileGithub />

                </div>
            );
        }

        return(
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            { profileContent }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);