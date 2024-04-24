const Service = require('../../services/Customer/customer.service')

const methods = {

  async onGetCustomer(req, res) {
    try {
      let result = await Service.getCustomer(req.query.CustCode)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  async onCreateCustomer(req, res) {
    try {
      let result = await Service.createCustomer(req.body)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },
}

module.exports = { ...methods }