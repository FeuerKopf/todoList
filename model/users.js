const Sequelize = require('sequelize') 
const db = require('../db')

const users = db.define('user', {
  
  user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: Sequelize.STRING
  },
  pass: {
      type: Sequelize.STRING
  },
});


module.exports = users