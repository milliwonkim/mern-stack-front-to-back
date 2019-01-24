const express = require('express');
const router = express.Router();

/**you don't need to say '/api/posts/test' 
 * because we already did in server.js 'app.use('/api/posts', posts);'
*/

/**res.json() is similar to res.send()
 * res.json() will automatically serve a status of 200 which means everything is OK
*/

/** @route             GET api/posts/test*/
/** @desc(description) Test posts route */
/** @access            Public */
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

module.exports = router;