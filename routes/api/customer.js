const router = require('express').Router()
const controllers = require('../../controllers/Customer/customer.controller')

router.get('/getcustomer', controllers.onGetCustomer)
router.post('/createcustomer', controllers.onCreateCustomer)

module.exports = router