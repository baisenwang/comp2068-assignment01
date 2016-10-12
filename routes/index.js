// <!-- baisen wang-->
var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baisen Wang', message:'--A software programmer'});
});
// get about me page
router.get('/aboutMe', function(req, res, next) {
  res.render('aboutMe', { title: 'About me', message:'Baisen Wang'});
});
// get services page
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', message:'I can do a lot of things for you.'});
});
// get contact me page
router.get('/contactMe', function(req, res, next) {
  res.render('contactMe', { title: 'Contact Me', message:'Here is the contact information of me.',head:'Do you want to send me a message?'});
});
// post contact me page and send me a email by nodemailer
router.post('/contactMe',function(req,res,next){
  // get all variables
  var name = req.body.yourname;
  var email = req.body.youremail;
  var message = req.body.yourmessage;
  // send by my email
  var smtpTrans = nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:"baisen.wang92@gmail.com",
      pass:"feinibuke5921+"
    }
  });
  // message format
  var mailOpts = {
    from:email,
    to:"baisen.wang@mygeorgian.ca",
    subject:"assignment1 message Name: "+name,
    text:'email:'+email+"      message:"+message
  };
  //send message and catch error
  smtpTrans.sendMail(mailOpts,function(err,info){
    if(err){
      res.redirect('error');
    }
    else{
      res.render('contactMe',{title:"Contact Me",
        message:'Here is the contact information of me.',
        head:'You have already send me a message!'
      });
    }
  });
});
module.exports = router;
