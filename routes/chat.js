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
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports = router