/** it's up to you if you wanna use the same database for development and production
 * or you could use 2 separate ones
 * but we don't wanna push this keys_dev.js file to Heroku or github
 * 
*/
module.exports = {
    mongoURI: 'mongodb://brad:brad123@ds129260.mlab.com:29260/dev-connector',
    secretOrKey: 'secret'
};
