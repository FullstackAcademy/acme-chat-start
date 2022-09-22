const router = require('express').Router()
const { User, Message } = require('../db').models;
const Sequelize = require('sequelize');
const socketMap = require('../socketMap');

module.exports = router

router.use('/users', require('./users'))
router.use('/messages', require('./messages'));
router.use('/onlineUsers', require('./onlineUsers'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
