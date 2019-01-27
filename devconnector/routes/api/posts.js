const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/**Post model */
const Post = require('../../models/Post');

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

module.exports = router;