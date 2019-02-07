import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class PostItem extends Component{

    onDeleteClick(id){
        console.log(id)
    }

    render(){

        /**'post' is from PostFeed.js
         * 'auth' is from 'mapStateToProps'
         */
        const { post, auth } = this.props;

        return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img
                        className="rounded-circle d-none d-md-block"
                        /**that's how we set it up
                          *so that if the user deletes their account,
                          *we can still have their avatar
                        */
                        src={post.avatar}
                        alt=""
                    />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">
                    {post.text}
                  </p>
                  <button type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-up"></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
                      <button
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        className="btn btn-danger mr-1"
                      >
                        <i className="fas fa-times" />
                      </button>
                  ) : null}
                </div>
              </div>
            </div>
        )
    }
}



PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    /**we need to check to see who's post
     * if it's the current user
     * then i want them to be able to delete it
      */
    auth: state.auth
})

export default connect(mapStateToProps)(PostItem);