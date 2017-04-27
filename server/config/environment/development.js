'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connection options
  sequelize: {
    uri: 'postgres://postgres:postgres@localhost:5432/smsInternal',
    options: {
      logging: false,
      dialect: 'postgres',
      define: {
        timestamps: true,
        underscored: true,
         freezeTableName: true,
      }
    }
  }
};
//uri: 'postgres://postgres:cronj123@192.168.1.223:5432/sms',
