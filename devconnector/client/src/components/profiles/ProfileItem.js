import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
    render(){

        /**this is come from the parent component 'Profiles.js' */
        const { profile } = this.props;

        return(
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={ profile.user.avatar } alt="" className="rounded-cirdcle" />
                    </div>
                    
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3> { profile.user.name } </h3>
                        <p>
                        {/** we want here is to say like Junior Developer at
                           * and then the company
                           * but if there is no company,
                           * we just wanted to say junior developer
                           * because status is required however company is not required*/}
                        {/** remember when you have fields that are not required,
                           * you have to test for those in your UI or else
                           * it will just display like senior developer at null or something like that*/}
                            { profile.status } { isEmpty(profile.company) ? null : (
                                <span>
                                    at { profile.company }
                                </span>
                            )}
                            <p>
                            {/**'location' is alos not required.
                               * So we have to test */}
                            { isEmpty(profile.location) ? null : (
                                <span>
                                    { profile.location }
                                </span>
                            ) }
                            </p>
                            {/** we use backtick */}
                            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                                View Profile
                            </Link>
                        </p>
                    </div>
                    
                    <div className="col-md-4 d-none d-md-block">
                        <h3>Skill Set</h3>
                        <ul className="list-group">
                            { profile.skills.slice(0, 4).map((skill, index) => (
                                /** we gonna use the index as the key 
                                  * when you use .map(),
                                  * you can get the index which will start at 0, 1, 2 and so on*/
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1">
                                        { skill }
                                    </i>
                                </li>
                            )) }
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;