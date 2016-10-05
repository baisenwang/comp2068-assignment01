var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baisen Wang', message:'This is my Express Portfolio Site!'});
});
router.get('/aboutMe', function(req, res, next) {
  res.render('aboutMe', { title: 'About me', message:'Baisen Wang!'});
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', message:'I can do a lot of things for you.'});
});
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'My project', message:'You can not believe that, I really have a lot of projects!'});
});
router.get('/contactMe', function(req, res, next) {
  res.render('contactMe', { title: 'Contact Me', message:'Here is the contact information of me.'});
});

module.exports = router;
