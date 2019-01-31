import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner'
class Dashboard extends Component {
    /**we wannna get called right away. */
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render(){
        /**these 'auth' and 'profile' properties is come from redux(reference to rootreducer) */
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if(profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            /**Check if logged in user has profile data */
            /**'Object.keys(profile)' gets the key of an object of the profile object  */
            if(Object.keys(profile).length > 0) {
                dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
            } else {
            /**User is logged in but has no profile */
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome { user.name }</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className="btn btn-lg btn-info">
                        Create Profile
                    </Link>
                </div>
            );
        }
    }

        return(
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            { dashboardContent }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);