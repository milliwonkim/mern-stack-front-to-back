/config
=======

```js
/* /config/keys.js */

module.exports = {
    mongoURI: 'mongodb://brad:brad123@ds129260.mlab.com:29260/dev-connector',
    secretOrKey: 'secret'
};
```

```js
/* /config/passport.js */

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if(user){
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
}
```

/models
=======

```js
/* /models/Post.js */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Create Schema */
const PostSchema = new Schema({
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
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    /** comment also has user */
    comments: [
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
```

```js
/* /models/Profile.js */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    /**handle means URL */
    handle: {
        type: String,
        required: true,
        /**max charactor is 40 */
        max: 40
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
```

```js
/* User.js */

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
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
```

/routes
=======

/api
-----

```js
/* /routes/api/posts.js */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/**Post model */
const Post = require('../../models/Post');
/**Profile model */
const Profile = require('../../models/Profile');

/**Validation */
const validatePostInput = require('../../validation/post');
/**===================================================================== */

/** @route             GET api/posts/test*/
/** @desc(description) Test posts route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

/** @route             GET api/posts*/
/** @desc(description) Get posts */
/** @access            Public */
router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

/** @route             GET api/posts/:id*/
/** @desc(description) Get posts by id */
/** @access            Public */
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

/**-------------------------------------------------------------------- */

/** @route             POST api/posts*/
/** @desc              Create post */
/** @access            Private */

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    /**initialize erros, isValid */

    const { errors, isValid } = validatePostInput(req.body);

    /**Check Validation */
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

/** @route             POST api/posts/like/:id*/
/** @desc              Like post*/
/** @access            Private */

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json( {alreadyliked: 'User already liked this post'} );
            }

            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             POST api/posts/unlike/:id*/
/** @desc              unlike post*/
/** @access            Private */

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**this is the deleting which is owned by only user */
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json( {notliked: 'you have not yet liked this post'} );
            }

            /*Get remove index */
            const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id)

            /** Splice out of array 
            */
            post.likes.splice(removeIndex, 1);

            /** Save */
            post.save().then(post => res.json(post))

            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             POST api/posts/comment/:id*/
/** @desc              Add comment to post*/
/** @access            Private */
router.post('/comment/:id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    /**Check Validation */
    if(!isValid){
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            /**Add to comments array */
            post.comments.unshift(newComment);

            /**Save */
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})

/**------------------------------------------------------------------------------------------------ */

/** @route             DELETE api/posts/:id*/
/** @desc              Delete post*/
/** @access            Private */

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    /**this is the deleting which is owned by only user */
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                /**401 is authorization status or an unauthorized status */
                return res.status(401).json({ notauthorized: 'User not authorized' });
            }

            /**Delete */
            post.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

/** @route             DELETE api/posts/comment/:id/:comment_id*/
/** @desc              Remove comment from post*/
/** @access            Private */
router.delete('/comment/:id/:comment_id', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            /**Check to see if comment exists */
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({ commentnotexist: 'Comment does not exist' });
            }
            /**Get remove index */
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})



module.exports = router;
```

```js
/* /routes/api/profile.js */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

/** @route             GET api/profile/test*/
/** @desc(description) Test profile route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

/** @route             GET api/profile*/
/** @desc(description) Get current users profile */
/** @access            Private */

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
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
/** @desc(description) Get profile by handle
/** @access            Pubulic */

router.get('/handle/:handle', (req, res) => {
    const errors = {};

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
    const { errors, isValid } = validateProfileInput(req.body);

    /**Check Validation */
    if(!isValid){
        return res.status(400).json(errors);
    }

    /**Get field */
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    /**Skills - Split into an array */
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
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
                /**update */
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    /**'$set' operator replaces the value of a field with the specified value */
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                /** Create */
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
    router.post('/experience', passport.authenticate('jwt', { session: false }),
    (req, res) => {

    const { errors, isValid } = validateExperienceInput(req.body);

    /**Check Validation */
    if(!isValid){
        return res.status(400).json(errors);
    }
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
                profile.experience.unshift(newExp);

                profile.save().then(profile => res.json(profile));
            })
    });

/** @route             POST api/profile/education*/
/** @desc(description) Add education to profile
/** @access            Private */

router.post('/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        const { errors, isValid } = validateEducationInput(req.body);

        /**Check Validation */
        if(!isValid){
            return res.status(400).json(errors);
        }
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
                    profile.education.unshift(newEdu);

                    profile.save().then(profile => res.json(profile));
                })
        }
    );

/** @route             DELETE api/profile/experience/:exp_id*/
/** @desc(description) Delete experience from profile
/** @access            Private */

router.delete('/experience/:exp_id',
passport.authenticate('jwt', { session: false }),
(req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            const removeIndex = profile.experience.map(item => item.id)
            .indexOf(req.params.exp_id);

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
        Profile.findOne({ user: req.user.id }).then(profile => {
            const removeIndex = profile.education.map(item => item.id)
            .indexOf(req.params.edu_id);
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
            User.findOneAndRemove({ _id: req.user.id })
            .then(() => res.json({ success: true }));
        });
    }
);

module.exports = router;
```

```js
/* /routes/api/users.js */

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

/**Load Input Validation */
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/** Load User Model */
const User = require('../../models/User')

/**=========================================================================== */

/** @route             GET api/users/test*/
/** @desc(description) Test users route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

/** @route             GET api/users/register*/
/** @desc(description) Register user */
/** @access            Public */
router.post('/register', (req, res) => {

/**----------------------------------------------------------------------- */

    const { errors, isValid } = validateRegisterInput(req.body)

    /**Check Validation */
    if(!isValid){
        /**we wanna send along the whole the entire error's object */
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', /** Size*/
                    r: 'pg', /** Rating */
                    d: 'mm' /** Default */
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
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

/**----------------------------------------------------------------------- */

/** @route             GET api/users/login*/
/** @desc(description) Login User / Returning JWT Token */
/** @access            Public */
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    /**Check Validation */
    if(!isValid){
        return res.status(400).json(errors);
    }

    /** using body-parser */
    const email = req.body.email;
    const password = req.body.password;

    /** Find user by email */
    User.findOne({ email: email })
        .then(user => {
            /** Check for user */
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            /**Check Password */
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        /**User Matched */
                        /**Create JWT Payload */
                        const payload = {id: user.id, name: user.name, avatar: user.avatar}

                        /** Sign Token */
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        });
});

/**----------------------------------------------------------------------- */

/** @route             GET api/users/current*/
/** @desc(description) Return current user */
/** @access            Private */

router.get(
    '/current', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
});

module.exports = router;
```

/validation
===========

```js
/* /validation/education.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

//======================================

module.exports = function validateEducationInput(data){
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

//---------------------------------------

if(Validator.isEmpty(data.school)){
    errors.school = 'School field is required';
}

if(Validator.isEmpty(data.degree)){
    errors.degree = 'Degree field is required';
}

if(Validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = 'Field of study field is required';
}

if(Validator.isEmpty(data.from)){
    errors.from = 'From date field is required';
}

//---------------------------------------

return{
    errors,
    isValid: isEmpty(errors)
    };
}
```

```js
/* /validation/experience.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

//======================================

module.exports = function validateExperienceInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

//---------------------------------------

if(Validator.isEmpty(data.title)){
    errors.title = 'Title field is required';
}

if(Validator.isEmpty(data.company)){
    errors.company = 'Company field is required';
}

if(Validator.isEmpty(data.from)){
    errors.from = 'From date field is required';
}

//---------------------------------------

return{
    errors,
    isValid: isEmpty(errors)
    };
}
```

```js
/* /validation/is-empty.js */

const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
```

```js
/* /validation/login.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

//======================================

module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

//---------------------------------------

if(Validator.isEmail(data.email)){
    errors.email = 'Email field is invalid';
}

if(Validator.isEmpty(data.email)){
    errors.email = 'Degree field is required';
}

if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required';
}

//---------------------------------------

return{
    errors,
    isValid: isEmpty(errors)
    };
}
```

```js
/* /validation/post.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

//======================================

module.exports = function validatePostInput(data){
    let errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { min: 10, max: 300 })){
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is invalid';
    }

//--------------------------------------

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
```

```js
/* /validation/profile.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

//-----------------------------------------------------------

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })){
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'Status field is required';
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required';
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL'
        }
    }

//---------------------------------------------------------

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
```

```js
/* /validation/register.js */

const Validator = require('validator');
const isEmpty = require('./is-empty');

//======================================

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

//---------------------------------------

if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    errors.name = 'Name must be between 2 and 30 characters';
}

if(Validator.isEmpty(data.name)){
    errors.name = 'Name field is required';
}

if(Validator.isEmpty(data.email)){
    errors.email = 'Email field is required';
}

if(!Validator.isEmail(data.email)){
    errors.email = 'Email field is invalid';
}

if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required';
}

if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password = 'Password must be at least 6 characters';
}

if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Confirm Password field is required';
}

if(Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match';
}

//---------------------------------------

return{
    errors,
    isValid: isEmpty(errors)
    };
}
```

---

```js
/* package.json */

{
  "name": "devconnector",
  "version": "1.0.0",
  "description": "Social network for developers",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
  "author": "Brad Traversy",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "gravatar": "^1.8.0",
    "jsonwebtoken": "^8.4.0",
    "mongoose": "^5.4.12",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "validator": "^10.11.0"
  },
  "devDependencies": {
    "nodemon": "^1.18.10"
  }

```

```js
/* server.js */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**DB Config */
const db = require('./config/keys').mongoURI

/**Connect to MongoDB*/
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());

/**passport config */
require('./config/passport')(passport);

/** Use Routes */
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
```