const Blog = require('../models/blog')

const blog_index = (req,res) => {
    Blog.find().sort({createdAt: 'desc'})  // sort all blogs by their creation time in descending order
    .then(result => {
        res.render('index', {title: 'All Blogs', blogs: result});
    }).catch(err => {
        console.log(err);
    })
}

const blog_create_get = (req,res) => {
    res.render('create', {title: 'Create a new blog'});
}

const blog_create_post = (req, res) => {
    console.log(req.body);  // request object getting the data from the form after submit button is clicked (urlencoded middleware)
    const blog = new Blog(req.body);
    blog.save().then(result => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    Blog.findById(req.params.id).then(result => {
        res.render('blog', {title: result.title, blog: result});
    }).catch(err => {
        console.log(err);
        res.status(404).render('404', {title: 'Blog Not Found'});
    })
}

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(result => {
        res.json({ redirect: '/' });
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
}