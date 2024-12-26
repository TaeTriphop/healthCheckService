const router = require('express').Router()

router.use('/healthcheck', require('./healthcheck'))


module.exports = router