const roiuter = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.sendStatus(400)
});

module.exports = router;