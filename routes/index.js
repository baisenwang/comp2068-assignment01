// <!-- baisen wang-->
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baisen Wang', message:'--A software programmer'});
});
router.get('/aboutMe', function(req, res, next) {
  res.render('aboutMe', { title: 'About me', message:'Baisen Wang'});
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', message:'I can do a lot of things for you.'});
});

router.get('/contactMe', function(req, res, next) {
  res.render('contactMe', { title: 'Contact Me', message:'Here is the contact information of me.'});
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Contact Me', message:'Here is the contact information of me.'});
});

module.exports = router;
