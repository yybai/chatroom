const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const passport = require('passport');


var userList = [];
function remove(array,element){
  return array.filter(e => e !== element);
}


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  if (userList.indexOf(req.user.username) == -1){
    userList.push(req.user.username);
  }
  res.redirect('/chat');
  
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  Students.register(new Students({ username : req.body.username }), req.body.password, (err, student) => {
    if (err) {
      return(err)
    }else{
      passport.authenticate('local')(req, res, () => {

        // if (userList.indexOf(req.user.username) == -1){
        //   userList.push(req.user.username);
        // }
        res.redirect('/chat');
      });
    }


  });
});




router.get('/logout', (req, res) => {

  // console.log(userList + '       before');
  
  // userList.splice( userList.indexOf(req.user.username)+1 );
  result = remove(userList,(req.user.username));
  userList = result;
  req.logout();
  // console.log('USER.JS ------- userList after logged out: ' + result);
  


  
  // console.log(req.user.username);
  res.redirect('/user/login');
});



module.exports = router