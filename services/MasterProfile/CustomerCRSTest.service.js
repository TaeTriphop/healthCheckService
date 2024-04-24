const customerCRSTest = require('../../models/Customer/CustomerCRS_Test'),
{ ErrorUnprocessableEntity, ErrorNotFound } = require('../../configs/errorMethods')

const methods = {
    
  findByCustCode(custCode) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await customerCRSTest.findAll({ where: { CustCode: custCode } })
        resolve(obj)
      } catch (error) {
        reject(ErrorNotFound(error))
      }
    })
  },

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {      
        await customerCRSTest.create(data)
        resolve()
      } catch (error) {
        reject(ErrorUnprocessableEntity(error.message))
      }
    })
  },

  update(data) {
    return new Promise(async (resolve, reject) => {
      try {      
        await customerCRSTest.save(data)
        resolve()
      } catch (error) {
        reject(ErrorUnprocessableEntity(error.message))
      }
    })
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await customerCRSTest.destroy({ where: { id: id } })
        resolve()
      } catch (error) {
        reject(ErrorUnprocessableEntity(error))
      }
    })
  },
}

module.exports = { ...methods }