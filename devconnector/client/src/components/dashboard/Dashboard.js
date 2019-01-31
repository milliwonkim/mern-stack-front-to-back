import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
    /**we wannna get called right away. */
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render(){
        return(
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default connect(null, { getCurrentProfile })(Dashboard);