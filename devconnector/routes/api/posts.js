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

module.exports = router;