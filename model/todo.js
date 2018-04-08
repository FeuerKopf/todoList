const Sequelize = require('sequelize') 
const db = require('../db')

const Todo = db.define('todo', {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    user: {
      type: Sequelize.STRING
  },
  user_id: {
      type: Sequelize.INTEGER
  },
  message: {
      type: Sequelize.STRING
  },
  complete: {
      type: Sequelize.BOOLEAN
  }
});


module.exports = Todo