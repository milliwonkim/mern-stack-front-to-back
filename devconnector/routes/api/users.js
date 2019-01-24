const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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

module.exports = router;