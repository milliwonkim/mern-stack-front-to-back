//entry-point file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/**passport is the main authentication module
 * google O Auth or JWT is the sub Module
 */
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initialize
const app = express();

/** Body Parser middleware
 *  so we can access req.body
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**DB config */
const db = require('./config/keys').mongoURI;

/**connect to MongoDB
 * using promise
*/
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

/**Passport middleware */
app.use(passport.initialize());

/**Passport Config */
/**In passport, we use what's called a strategy
 * for instance, when we did the local authentication and that other course we had a local strategy
 * When we did google O Auth, then we had google strategy
 * so now we are gonna have a JWT strategy
 * and that's what is going to go in this config file
 */
require('./config/passport')(passport);

/** Use Routes */
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

/**Server static assets if in production */
/**check to see if we are on our server on heroku */
if(process.env.NODE_ENV === 'production'){
    /**Set static folder to client/build folder */
    app.use(express.static('client/build'));
    /**any route that gets hit here,
     * we are just gonna load the react index.html file in build folder
     */
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/**when you deploy to Heroku, you wanna set it to process.env.PORT || 5000 */
const port = process.env.PORT || 5000;

/** using backtick to use dynamic variable */
app.listen(port, () => console.log(`Server running on port ${port}`));

