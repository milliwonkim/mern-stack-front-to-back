const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user:{
        /**this gonna associate the user by its ID */
        type: Schema.Types.ObjectId,
        /**we need to reference the collection that this refers to
         * because we can refer any collection
         * obviously the only other collection we have in our database is users
         * and that's what we wanna hear
         */
        ref: 'users'
    },
    /**handle means URL */
    handle: {
        type: String,
        /** The required prop can take a validation value, just like validations.
         * This is to define what validation rule should define the input as required.
         * By default that is required, required={true}
         *
         * it's gonna be required even though we are doing our validation in our validation files
         * like we did here with the login.js and register.js
         * so we will have one per profile as well
         * but we are still gonna mark it as required here*/
        required: true,
        /**max charactor is 40 */
        max: 40

        /**so we have kind of a double line of defense when it comes to validation
         * we have validation we are gonna create in here and we have mongoose
         * but our validation(validation folder) will handle it much more elegantly
         * and that's what we will use to basically send the errors to the front end and so on
        */
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    },
    githubusername:{
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
                /**I'm not gonna make this 'required: true'
                 * because i want them to have a checkbox that says 'Current'
                 * it could be a job that they are still working at
                 * and in that case, on our profiles it's gonna say the from date dash now representing still working there
                 */
            },
            current: {
                type: Boolean,
                default: false
            },
            description:{
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
                /**I'm not gonna make this 'required: true'
                 * because i want them to have a checkbox that says 'Current'
                 * it could be a job that they are still working at
                 * and in that case, on our profiles it's gonna say the from date dash now representing still working there
                 */
            },
            current: {
                type: Boolean,
                default: false
            },
            description:{
                type: String
            }
        }
    ],
    social:{
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        /**Date.now will just automatically put in the current time stamp */
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);