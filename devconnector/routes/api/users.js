const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')

/** Load User Model */
const User = require('../../models/User')

/**you don't need to say '/api/users/test'
 * because we already did in server.js 'app.use('/api/users', users);'
*/

/**res.json() is similar to res.send()
 * res.json() will automatically serve a status of 200 which means everything is OK
*/

/** JSON Web Token for access a private route
 * you will have to send a token along with it by registering
 * and then logging in and it sends you a token
 * you then send that token with your request
 */

/** @route             GET api/users/test*/
/** @desc(description) Test users route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

/** @route             GET api/users/register*/
/** @desc(description) Register user */
/** @access            Public */
router.post('/register', (req, res) => {
    /**we don't want to register with an email that is already in the database
     * findOne() allows us to looking for a record that has an email the user is trying to register
    */
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                /** 'avatar' will be used in 'avatar' in newUser variable */
                const avatar = gravatar.url(req.body.email, {
                    s: '200', /** Size*/
                    r: 'pg', /** Rating */
                    d: 'mm' /** Default */
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    //if key is same to value, then you can use just only 'avatar'
                    //avatar,
                    avatar: avatar,
                    password: req.body.password
                });
/** once we get that salt, we want to create our hash with our hash or passwor
 */
                bcrypt.genSalt(10, (err, salt) => {
/** if we get err, display err
 * but if not, we get hash which is what we wanna store in the database
 */
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
/**set the newUser.password to hash */
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

/** @route             GET api/users/login*/
/** @desc(description) Login User / Returning JWT Token */
/** @access            Public */
router.post('/login', (req, res) => {
    /** using body-parser */
    const email = req.body.email;
    const password = req.body.password;

    /** Find user by email */
    User.findOne({ email: email })
        .then(user => {
            /** Check for user */
            if(!user) {
                return res.status(404).json({ email: 'User not found' });
            }

            /**Check Password */
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        /**User Matched */
                        /**Create JWT Payload */
                        const payload = {id: user.id, name: user.name, avatar: user.avatar}

                        /** Sign Token */
                        /**it's gonna take in a payload which is what we wanna include in the token
                         * what we wanna include is some user information
                         * because when that token gets sent to the server
                         * we wanna decode it and it needs to know what user it is
                         * also we need to send a secret key, we know we need to send a expiration if we want it to expire in a certain amount of time
                         */
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                /**the way we format these token in the header is by putting the word "Bearer"
                                 * or we are gonna be using a Bearer token which is a certain type of protocol
                                 * so we are gonna tack that on to the token. So we don't have to do it when we actually make the request
                                 */
                                token: 'Bearer ' + token
                            })
                        });
                    } else{
            /** these names like password or something like that is very important
             * because we are actually gonna be using these messages on the front end when we get them
             */
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                })
        });
});

module.exports = router;