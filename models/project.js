// link to mongoose
var mongoose = require('mongoose');


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
// note the public class name is singular and starts with a Capital
module.exports = mongoose.model('Project', projectSchema);