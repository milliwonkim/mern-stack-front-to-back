const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/**Post model */
const Post = require('../../models/Post');
/**Profile model */
const Profile = require('../../models/Profile');

/**Validation */
const validatePostInput = require('../../validation/post');
/**===================================================================== */

/**you don't need to say '/api/posts/test' 
 * because we already did in server.js 'app.use('/api/posts', posts);'
*/

/**res.json() is similar to res.send()
 * res.json() will automatically serve a status of 200 which means everything is OK
*/

/** @route             GET api/posts/test*/
/** @desc(description) Test posts route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

/** @route             GET api/posts*/
/** @desc(description) Get posts */
/** @access            Public */
router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

/** @route             GET api/posts/:id*/
/** @desc(description) Get posts by id */
/** @access            Public */
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

/**-------------------------------------------------------------------- */

/** @route             POST api/posts*/
/** @desc              Create post */
/** @access            Private */

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    /**initialize erros, isValid */

    const { errors, isValid } = validatePostInput(req.body);

    /**Check Validation */
    if(!isValid){
        /**If any errors, send 400 with errors object */
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        /**even though it's comming from the body
         * the way that we are gonna do it and react is
         * we are gonna pull the name in the Avatar and the user from the user state
         * when the user is logged in,
         * redux is basically gonna keep that users information in the state
         * throughout the entire application as long as they are logged in
         * and we have access to it whenever we want
         * so when they submit a post, we are gonna pull it from redux,
         * they are not gonna type in their name and re-upload their avatar or anything like that
         */
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

/** @route             POST api/posts/like/:id*/
/** @desc              Like post*/
/** @access            Private */

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**this is the deleting which is owned by only user */
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            /**we need to check to see if the user has already liked this post */
            /**
             * what this means is that the user has already liked it
             * because it's already there his ID already in this array(post.likes)
             */
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json( {alreadyliked: 'User already liked this post'} );
            }

            /**Add user Id to likes array */
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             POST api/posts/unlike/:id*/
/** @desc              unlike post*/
/** @access            Private */

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**this is the deleting which is owned by only user */
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            /** ' === 0 ' means if it equals zero then that means they are not there 
             * if they are not there, then we wanna basically say an error that says you have not yet liked this post
            */
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json( {notliked: 'you have not yet liked this post'} );
            }

            /*Get remove index */
            const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id)

            /** Splice out of array 
             * wa want to remove 1 from removeIndex
            */
            post.likes.splice(removeIndex, 1);

            /** Save */
            post.save().then(post => res.json(post))

            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             POST api/posts/comment/:id*/
/** @desc              Add comment to post*/
/** @access            Private */
router.post('/comment/:id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {

    /** all we really need to validate here is the text
     * because it has the same fields as a post
     * so we don't even have to worry about doing that part
     * so we will go ahead and copy what we did up here
     */
    const { errors, isValid } = validatePostInput(req.body);

    /**Check Validation */
    if(!isValid){
        /**If any errors, send 400 with errors object */
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            /**Add to comments array */
            post.comments.unshift(newComment);

            /**Save */
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})

/**------------------------------------------------------------------------------------------------ */

/** @route             DELETE api/posts/:id*/
/** @desc              Delete post*/
/** @access            Private */

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**this is the deleting which is owned by only user */
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            /**Check for post owner */
            /**'post' has a user field but we want to compare this 
             * this is gonna be looked at as a string
            */
            if(post.user.toString() !== req.user.id){
                /**401 is authorization status or an unauthorized status */
                return res.status(401).json({ notauthorized: 'User not authorized' });
            }

            /**Delete */
            post.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             DELETE api/posts/comment/:id/:comment_id*/
/** @desc              Remove comment from post*/
/** @access            Private */
router.delete('/comment/:id/:comment_id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            /**Check to see if comment exists */
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotexist: 'Comment dos not exist' });
            }
            /**Get remove index */
            const removeIndex = post.comments
                .map(item => item._id.toString())
                /**that will give us the correct comment to remove */
                .indexOf(req.params.comment_id);
            /**Splice comment out of array */
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})



module.exports = router;
