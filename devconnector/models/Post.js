const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Create Schema */
const PostSchema = new Schema({
    /**we are gonna to connect each post to a user like we did with the profile*/
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    /** we could do what we did with the profile
     * and basically populated with the Avatar the name from the user
     * but i want to be separated because if the user decides to delete their account
     * i don't want their posts and their comments to be deleted as well
    */

    /**So each post is also gonna have name and Avatar
     * and they are not gonna have to fill this in 
     * when they create a post or comment all they are gonna have to put is the text 
     * the name, the avatar that will just fill in programmatically from what we are gonna do
     */
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    /**i want i don't want the user to be able to hit the like button more than once account 
     * so if they hit the like button, what will happen is their user id will go into this array
     * if they dislike the post, their user id will get removed from the array
    */
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    /** comment also has user */
    comment: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);

