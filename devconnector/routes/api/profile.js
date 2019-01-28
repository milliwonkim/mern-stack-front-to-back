const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/**it's gonna be a protected route that will get the current users profile
 * curren user meaning the user that's logged in at that time
 */
/**we are gonna use that for protected routes using passport */
const passport = require('passport');

/**Load Validation */
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


/**Load Profile Model*/
const Profile = require('../../models/Profile');
/**Load User Model */
const User = require('../../models/User');

/**=========================================================================================== */

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

        Profile.findOne({ user: req.user.id })
        /**so what we have to do is go to get route and findOne and use populate() method
         * because since we basically connected our user collection to the profile inside the model like in Profile.js
         * user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
                },
         * we are able to populate fields from users into this their response
        */
            .populate('user', ['name', 'avatar'])
            .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
    }).catch(err => res.status(404).json(err));
    }
);

/** @route             GET api/profile/all*/
/** @desc(description) Get all profiles
/** @access            Pubulic */

router.get('/all' ,(req, res) => {
    const errors = {};
    /**not 'findOne' but 'find' because we find not one but all */
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
});

/** @route             GET api/profile/handle/:handle*/
    /**':handle' is the actual handle which is the backend API route.
     * the front end page will be '/profile/handle'
     * we are not acutally gonna have to put the word handle in the route in the browser
    */
/** @desc(description) Get profile by handle
/** @access            Pubulic */

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    /**the way we can get the handle from the URL is by using req.params.handle
     * req.params.handle will match to the handle in the database
    */
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err =>
        res.status(404).json({ profile: 'There is no profiles'}));
});

/** @route             GET api/profile/user/:user_id*/
/** @desc(description) Get profile by user ID
/** @access            Pubulic */

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    /**we are not gonna use 'req.user.id' which is comes from the token
     * because we don't want just the logged in user.
     * we want whatever user is passed in
     */
    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user'}));
});

/**-------------------------------------------------------------------------------------------------------- */

/** @route             POST api/profile*/
/** @desc(description) Create or Edit user profile */ //because this is also gonna be update route
/** @access            Private */

router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) => {

    /**all the form fields that are submitted
     * and then we just wanna check that validation
     *
     * basically we just need to do this at the beginning of anything
     * that we are trying to validate
     */
    const { errors, isValid } = validateProfileInput(req.body);

    /**Check Validation */
    if(!isValid){
        /**Return any errors with 400 status*/
        return res.status(400).json(errors);
    }

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
                    /**'$set' operator replaces the value of a field with the specified value */
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

/** @route             POST api/profile/experience*/
/** @desc(description) Add experience to profile
/** @access            Private */
    /**the reson of 'Private' is because we need the actual user that is submitting the form */

    router.post('/experience', passport.authenticate('jwt', { session: false }),
    (req, res) => {

    /**all the form fields that are submitted
     * and then we just wanna check that validation
     *
     * basically we just need to do this at the beginning of anything
     * that we are trying to validate
     */
    const { errors, isValid } = validateExperienceInput(req.body);

    /**Check Validation */
    if(!isValid){
        /**Return any errors with 400 status*/
        return res.status(400).json(errors);
    }

        /**req.user.id is coming from the token */
        Profile.findOne({ user: req.user.id }).then(profile => {
                const newExp = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description
                }
                /**what we need to do is just add to the array of our profile
                 * we are not gonna use '.push()' because push will put it at the end
                 * we want add to the beginning
                */
                profile.experience.unshift(newExp);

                profile.save().then(profile => res.json(profile));
            })
    });

/** @route             POST api/profile/education*/
/** @desc(description) Add education to profile
/** @access            Private */
    /**the reson of 'Private' is because we need the actual user that is submitting the form */

router.post('/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        /**all the form fields that are submitted
         * and then we just wanna check that validation
         *
         * basically we just need to do this at the beginning of anything
         * that we are trying to validate
         */
        const { errors, isValid } = validateEducationInput(req.body);

        /**Check Validation */
        if(!isValid){
            /**Return any errors with 400 status*/
            return res.status(400).json(errors);
        }

            /**req.user.id is coming from the token */
            Profile.findOne({ user: req.user.id }).then(profile => {
                    const newEdu = {
                        school: req.body.school,
                        degree: req.body.degree,
                        fieldofstudy: req.body.fieldofstudy,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    };
                    /**what we need to do is just add to the array of our profile
                     * we are not gonna use '.push()' because push will put it at the end
                     * we want add to the beginning
                    */
                    profile.education.unshift(newEdu);

                    profile.save().then(profile => res.json(profile));
                })
        }
    );

/** @route             DELETE api/profile/experience/:exp_id*/
        /**it's gonna need the id of the experienced member.
         * we saw that when it's created it actually create id on its own
         */
/** @desc(description) Delete experience from profile
/** @access            Private */

router.delete('/experience/:exp_id',
passport.authenticate('jwt', { session: false }),
(req, res) => {

        /**req.user.id is coming from the token */
        Profile.findOne({ user: req.user.id }).then(profile => {
            /**we wanna basically find the experience that we wanna delete */
            /**Get remove index */

            /**we use map() which basically allows you to map an array to something else */
            const removeIndex = profile.experience.map(item => item.id)
            /**req.params.exp_id will get us the correct experience to delete
             * The indexOf() method returns the first index
             * at which a given element can be found in the array,
             * or -1 if it is not present.
            */
            .indexOf(req.params.exp_id);

            /**Splice out of array
             * The splice() method changes the contents of an array
             * by removing or replacing existing elements and/or adding new elements.
             * 
             * we know which one we wanna remove
             * and we wanna move just 1 from that index
            */
            profile.experience.splice(removeIndex, 1);

            /**Save */
            profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    }
);

/** @route             DELETE api/profile/education/:edu_id*/
/** @desc(description) Delete education from profile
/** @access            Private */

router.delete('/education/:edu_id',
passport.authenticate('jwt', { session: false }),
(req, res) => {

        /**req.user.id is coming from the token */
        Profile.findOne({ user: req.user.id }).then(profile => {
            /**we wanna basically find the experience that we wanna delete */
            /**Get remove index */

            /**we use map() which basically allows you to map an array to something else */
            const removeIndex = profile.education.map(item => item.id)
            /**req.params.exp_id will get us the correct experience to delete
             * The indexOf() method returns the first index
             * at which a given element can be found in the array,
             * or -1 if it is not present.
            */
            .indexOf(req.params.edu_id);

            /**Splice out of array
             * The splice() method changes the contents of an array
             * by removing or replacing existing elements and/or adding new elements.
             * 
             * we know which one we wanna remove
             * and we wanna move just 1 from that index
            */
            profile.education.splice(removeIndex, 1);

            /**Save */
            profile.save().then(profile => res.json(profile));
            }).catch(err => res.status(404).json(err));
    }
);

/**@route    Delete api/profile */
/**@desc     Delete user and profile */
/**@access   Private */

router.delete('/',
passport.authenticate('jwt', { session: false }),
(req, res) => {
        Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            /**This will delete the profile
             * but i'm gonna have it also delete the user
             * and if you wanna do it differently
             * where i would just delete the profile
             * but it keeps the user in the collection you could do that
             */

             /**since this is users collection,
              * we are not matching user
              * matching the ID itself which is _id
              */

              /**we wanna match that to req.user.id
               * and that will give us a promise
               */
            User.findOneAndRemove({ _id: req.user.id })
            /**obviously the profile is gone, the user is gone,
             * so i'm just gonna say success true and save
             */
            .then(() => res.json({ success: true }));
        });
    }
);

module.exports = router;

