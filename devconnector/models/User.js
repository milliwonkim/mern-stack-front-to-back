const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Create Schema */
const UserSchema = new Schema({
    name: {
        type: String,
        /**this is how we define the field */
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
/** 'required: true' in here is necessary
 * because we are not actually getting that in as an input
 * it's getting stored programmatically through that file with the email
*/
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
