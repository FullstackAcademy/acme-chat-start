const router = require('express').Router()
const socketMap = require('../socketMap');
const { User } = require('../db').models;

module.exports = router

router.get('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if(!user){
      return next('nooo');
    }

    res.send(Object.values(socketMap).map( value => value.user).filter(u => u.id !== user.id));
  }
  catch(ex){
    next(ex);
  }
});
