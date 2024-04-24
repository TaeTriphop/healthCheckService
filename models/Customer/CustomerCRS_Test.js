const db = require('../../configs/databases')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = db.MasterProfile()
moment = require('moment')
sequelize.sync()

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
}

const CustomerCRS_Test = sequelize.define(
    'CustomerCRS_Test',
    {
        id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull: false },
        CustCode: { type: DataTypes.STRING(10) },
        crsPlaceOfBirthCountry: { type: DataTypes.STRING(2) },
        crsPlaceOfBirthCity: { type: DataTypes.STRING(2) },
        crsTaxResidenceInCountriesOtherThanTheUS: { type: DataTypes.BOOLEAN },
        crsDeclarationDate: { type: DataTypes.DATEONLY },
        tin: { type: DataTypes.STRING(20) },
        reason: { type: DataTypes.STRING(1) },
        reasonDesc: { type: DataTypes.STRING(100) },
        countryOfTaxResidence: { type: DataTypes.STRING(2) },
        updatedate: { type: Sequelize.DATE, allowNull: false, defaultValue: moment().format('YYYY-MM-DD HH:mm:ss') }
    },
    {
        tableName: 'CustomerCRS_Test',
        timestamps: false
    }
  )

  module.exports = CustomerCRS_Test
