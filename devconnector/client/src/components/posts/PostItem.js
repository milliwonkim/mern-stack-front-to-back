import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component{

    onDeleteClick(id){
        this.props.deletePost(id);
    }

    onLikeClick(id){
      this.props.addLike(id);
    }

    onUnlikeClick(id){
      this.props.removeLike(id);
    }

    findUserLike(likes){
      const { auth } = this.props;
      /**we gonna check to see if the user is in that array
       * likes array has the user inside
       */
      if(likes.filter(like => like.user === auth.user.id).length > 0){
        return true;
      } else {
        return false;
      }
    }

    render(){

        /**'post' is from PostFeed.js
         * 'auth' is from 'mapStateToProps'
         */
        const { post, auth, showActions } = this.props;

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
                  {/**
                     * this means that
                     * only show if showActions is true
                     * and i want actions to be true by default
                     * so we can add default prompt above 'PostItem.propTypes'
                   */}
                {showActions ? (
                  <span>
                  <button type="button" className="btn btn-light mr-1">
                    <i
                      onClick={this.onLikeClick.bind(this, post._id)}
                      className={classnames('fas fa-thumbs-up', {
                        /**'text-info' makes thumb be green */
                        'text-info': this.findUserLike(post.likes)
                      })}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button
                      onClick={this.onUnlikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-light mr-1">
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
                  </span>
                ) : null}
                </div>
              </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);