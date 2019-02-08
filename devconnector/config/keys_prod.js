module.exports = {
    /**we can add 'process.env.MONGO_URI through our Heroku 
     * if someone gets this file to github, this means nothing to them
     * these are gonna basically our server, is gonna recognize this
     * no one else is gonna understand what the actual URI or what the actual secret is
    */
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY
};
