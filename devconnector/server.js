//entry-point file

const express = require('express');

//initialize
const app = express();

//simple route to get something up and running
app.get('/', (req, res) => res.send('Hello'));

/**when you deploy to Heroku, you wanna set it to process.env.PORT || 5000 */
const port = process.env.PORT || 5000;

/** using backtick to use dynamic variable */
app.listen(port, () => console.log(`Server running on port ${port}`))