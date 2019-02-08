if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod');
} else {
    /** we don't want push keys_dev.js file
     * so go to '.gitignore' file
     */
    module.exports = require('./keys_dev');
}