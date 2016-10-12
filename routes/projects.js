var express = require('express');
var router = express.Router();

// link to the Project model
var Project = require('../models/project');

router.get('/', function(req, res, next) {

    Project.find(function(err, projects) {
        if (err) {
            console.log(err);
            res.redirect('error');
        }
        else {
            res.render('projects', {
                title: 'Playoff Project',
                projects: projects,
                message: 'I really have a lot of projects!'
            })
        }
    });
});
module.exports = router;
