const express = require('express');
const router = express.Router();

/**you don't need to say '/api/users/test' 
 * because we already did in server.js 'app.use('/api/users', users);'
*/

/**res.json() is similar to res.send()
 * res.json() will automatically serve a status of 200 which means everything is OK
*/
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

module.exports = router;