const router = require('express').Router()

const controllers = require('../../controllers/HealthCheck/healthcheck.controller')

router.get('/processCheck', controllers.onProcessCheck)

module.exports = router
