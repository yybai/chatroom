const express = require('express');
const router = express.Router();
const Students = require('../models/students');

//render add student page
router.get('/add', (req, res, next) => {
  res.render('add');
})

//render student detail page
router.get('/:id', (req, res, next) => {
  Students.findById(req.params.id, (err, student) =>{
    res.render('detail', { student })
  })
})

//handle add new student
router.post('/add', (req, res, next) => {
  const student = new Students(req.body)
  student.save((err, doc)=>{
    if (err){
      res.send(err)
    }
    else{
      res.redirect('/')
    }
  })
})

//handle update student
router.post('/update/:id', (req, res, next) => {
  Students.update({_id:req.params.id}, { $set: req.body }, err =>{
    if(err){
      res.send(err)
    }
    else{
      res.redirect('/')
    }
  })
})

//handle delete student
router.post('/delete', (req, res, next) => {
  Students.remove({ _id: req.body.studentId }, err => {
    if (err){
      res.send(err)
    }
    else{
      res.json({ result: 'success' })
    }
  })
})

module.exports = router;