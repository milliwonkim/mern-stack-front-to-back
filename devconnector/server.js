//entry-point file

const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initialize
const app = express();

/**DB config */
const db = require('./config/keys').mongoURI;

/**connect to MongoDB
 * using promise
*/
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//simple route to get something up and running
app.get('/', (req, res) => res.send('Hello'));

/** Use Routes */
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

/**when you deploy to Heroku, you wanna set it to process.env.PORT || 5000 */
const port = process.env.PORT || 5000;

/** using backtick to use dynamic variable */
app.listen(port, () => console.log(`Server running on port ${port}`))

