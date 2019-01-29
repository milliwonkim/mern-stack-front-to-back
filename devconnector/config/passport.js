/**This is where we need to basically create our strategy */

const JwtStrategy = require('passport-jwt').Strategy;
/**"ExtractJWT" will enable us to extract the payload which is the user data
 * and do what we want with it
 */
const ExtractJwt = require('passport-jwt').ExtractJwt;
/**we are gonna bring in mongoose
 * because we are gonna be searching for the user that come with the payload
 */
const mongoose = require('mongoose');
/**"users" comes from module.exports = User = mongoose.model('users', UserSchema); in User.js */
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
/**we are gonna use this one right here "fromAuthHeaderAsBearerToken()"  */

/**we are gonna specify that we wanna use a bearer token
  * remember we added that bearer string before token
  * we need to add the secret key which we have in our keys file
  */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
    /** we included in our payload in users.js
     * 
    */
    /**What we want to do is just get the usuer that's being sent in the token */
    /**"jwt_payload" is the object that has the user ID in it */
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        /**the first parameter is an error which there isn't any. So we gonna say null
                         * second is gonna be the actual user
                          */
                        return done(null, user);
                    }
                    /** if the user isn't found, we are still gonna return done
                     * and we are still gonna return as the first parameter
                     * but false as the second because there is no user
                     */
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
}