const logger = require('../../configs/logger')
const custCRS = require('../MasterProfile/CustomerCRSTest.service'),
{ ErrorBadRequest, ErrorNotFound } = require('../../configs/errorMethods')
const methods = {

  getCustomer(CustCode) {
    return new Promise(async (resolve, reject) => {
      try {
        logger.info("CustCode : " + CustCode)
        const obj = await custCRS.findByCustCode(CustCode)
        resolve(obj)
      } catch (error) {
        reject(ErrorBadRequest(error))
      }
    })
  },

  createCustomer(data) {
    return new Promise(async (resolve, reject) => {
      try {
        logger.info("Body : " + JSON.stringify(data))
        const obj = await custCRS.insert(data)
        resolve(obj)
      } catch (error) {
        reject(ErrorBadRequest(error))
      }
    })
  },
}

module.exports = { ...methods }