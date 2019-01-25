const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/**it's gonna be a protected route that will get the current users profile
 * curren user meaning the user that's logged in at that time
 */
/**we are gonna use that for protected routes using passport */
const passport = require('passport');

/**Load Profile Model*/
const Profile = require('../../models/Profile');
/**Load User Profile */
const User = require('../../models/User');

/**you don't need to say '/api/profile/test'
 * because we already did in server.js 'app.use('/api/profile', profile);'
*/

/**res.json() is similar to res.send()
 * res.json() will automatically serve a status of 200 which means everything is OK
*/

/** @route             GET api/profile/test*/
/** @desc(description) Test profile route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

/** @route             GET api/profile*/
/** @desc(description) Get current users profile */
/** @access            Private */

/**we just need only '/' because it's gonna be 'api/profile'
 * and since we are using the router, we are already linked 'api/profile' to this file
 */
/**it's gonna be a protected role.
 * we need to do passport.authenticate
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**we want to fetch the current user's profile
     * since we get this is protected, we are gonna get a token
     * that token is now gonna put the user in to req.user
    */
    /**findOne() is mongoose method */
    /** req.user.id is equal to Schema.Types.ObjectId
    * user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
        },

    it depends on what users logged in to what ID is gonna be
    */

        /** initialize a variable called errors and set it to an empty object*/
        const errors = {};

        Profile.findOne({ user: req.user.id }).then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
    }).catch(err => res.status(404).json(err));
});

module.exports = router;

