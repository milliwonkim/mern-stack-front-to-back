import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/**the reason we import 'react-router-dom' is that
 * we are actually gonna have an action to delete experience from inside here
 * and once we delete it, we wanna just redirect to our dashboard
 */
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component{

    onDeleteClick(id){
        /**'this.props.history' can redirect because of 'withRouter' */
        this.props.deleteExperience(id);
    }
    render(){

        const experience = this.props.experience.map(exp => (
            /**since this is the array that we are looping through
             * so we need the key
             * Each experience has its own IDs
             */
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {/** if you select at 'current' checkbox,
                       * 'to' is gonna be null */}
                    { exp.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    ) }
                </td>
                <td>
                    {/**we are gonna bind(this)
                       *because we don't have a constructor 
                       *i'm not gonna create one just to do that*/}
                    <button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        ));

        return(
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>

                            { experience }

                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);