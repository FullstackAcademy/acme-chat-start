const router = require('express').Router()
const { db, models: {User, Message}} = require('../db');

module.exports = router

router.post('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let message = await Message.create({ ...req.body, fromId: user.id });
    message = await Message.findByPk(message.id, {
      include: [
        { model: User, as: 'to' },
        { model: User, as: 'from' },
      ]
    });

    res.send(message);
  }
  catch(ex){
    next(ex);
  }

});

router.get('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await Message.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          {toId: user.id },
          { toId: null },
          { fromId: user.id }
        ]
      },
      include: [
        { model: User, as: 'to' },
        { model: User, as: 'from' }
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});
