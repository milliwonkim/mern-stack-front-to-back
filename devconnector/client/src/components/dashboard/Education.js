import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/**the reason we import 'react-router-dom' is that
 * we are actually gonna have an action to delete experience from inside here
 * and once we delete it, we wanna just redirect to our dashboard
 */
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component{

    onDeleteClick(id){
        /**'this.props.history' can redirect because of 'withRouter' */
        this.props.deleteEducation(id);
    }
    render(){

        const education = this.props.education.map(edu => (
            /**since this is the array that we are looping through
             * so we need the key
             * Each experience has its own IDs
             */
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {/** if you select at 'current' checkbox,
                       * 'to' is gonna be null */}
                    { edu.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    ) }
                </td>
                <td>
                    {/**we are gonna bind(this)
                       *because we don't have a constructor 
                       *i'm not gonna create one just to do that*/}
                    <button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        ));

        return(
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                        </tr>

                            { education }

                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);