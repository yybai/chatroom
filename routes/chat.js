const express = require('express');
const router = express.Router();
const Chats = require('../models/chats');

router.get('/', (req, res, next) => {
  Chats.find({}, {}, { sort: { createdAt: 1 } }, (err, messages) => {
    if(err) {
      next(err)
    } else {
      if(req.user){
        res.render('chat', { user: req.user, messages })
      } else {
        res.redirect('/user/login')
      }
    }
  })
});

module.exports = router