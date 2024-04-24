const Sequelize = require('sequelize');
const config = require('./app')

const databases = {
   // MasterProfile DB
   MasterProfile() {
    const sequelize = new Sequelize(config.pstDB, config.pstDBUser, config.pstDBPassword, {
      host: config.pstDBHost,
      dialect: 'mssql',
      dialectOptions: {
        encrypt: true
      }
    });
    sequelize
    .authenticate()
    .then(() => {
      console.log('Connection MasterProfile has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
    return sequelize
  },
}

module.exports = databases