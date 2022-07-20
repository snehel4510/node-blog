const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // a constructor function

// schema is just a blueprint for the data that will be stored in the database
const blogSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    snippet: {
        type: String,
        required: true
     },
    body: {
        type: String,
        required: true
     },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, {timestamps: true});

// connect the schema model to the database collection (blogs)
const Blog = mongoose.model('Blog', blogSchema); // it's automatically gonna pluralize the collection name
module.exports = Blog;