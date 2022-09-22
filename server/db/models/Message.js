const db = require('../db')
const { Sequelize } = db;
const socketMap = require('../../socketMap');


const Message = db.define('message', {
  isPublic: {
    type: Sequelize.VIRTUAL,
    get: function(){
      return !this.toId;
    }
  },
  txt: {
    type: Sequelize.STRING
  },
  fromId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Message.addHook('beforeValidate', (message)=> {
  if(!message.toId){
    message.toId = null;
  }
});

module.exports = Message;

