//author:baisen wang
// link to mongoose
var mongoose = require('mongoose');

// create a project schema
var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        required: 'Content cannot be blank'
    }
});

// make this schema public using the schema defined above
// make the schema public
module.exports = mongoose.model('Project', projectSchema);