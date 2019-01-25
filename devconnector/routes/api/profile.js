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
    }
);

/** @route             POST api/profile*/
/** @desc(description) Create or Edit user profile */ //because this is also gonna be update route
/** @access            Private */

router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) => {
    /**Get field */
    const profileFields = {};
    /**there's gonna be a couple of things that don't come from the form such as the user */
    profileFields.user = req.user.id;
    /**we are checking to see if the field that we are looking for has come in */
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    /**Skills - Split into an array
     * because its coming as the comma separated values
     */
    if(typeof req.body.skills !== 'undefined'){
        /**that will now give us an array of skills to put into the database
         * as opposed to just the comma separated values
         */
        profileFields.skills = req.body.skills.split(',');
    }

    /** 'social' has its own object
    */
   /** we set this being empty
    * because if we try to add the profileFields.social without doing this,
    * it's gonna say profileFields.social doesn't exist
    */
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    /** req.user.id is 'logged in user' */
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                /**update
                 * first parameter is gonna be who do we wanna update
                 * second parameter is gonna be
                */
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                /** Create */
                /** check to see if the handle exists
                 * because we don't want multiple handle
                 * handle is basically for SEO, it's to access the profile page and SEO friendly
                 */
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if(profile){
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        /**Save Profile */
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
            }
        })
});

module.exports = router;

