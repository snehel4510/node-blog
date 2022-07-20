const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();


// display all blogs
router.get('/', blogController.blog_index);

// create new blog page
router.get('/create', blogController.blog_create_get);

// get request to a single blog using route parameters
router.get('/:id', blogController.blog_details);

// send a post request to create a new blog
router.post('/', blogController.blog_create_post);

// delete a particular blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;