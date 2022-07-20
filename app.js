const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();

const app = express()

// connect to mongodb database
const dbURI = process.env.URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))  // listen for requests after the connection is established
    .catch(err => console.log(err))

// setting up the template engine
app.set('view engine', 'ejs');


// middleware to get request details for every request being made
// app.use((req, res, next) => {
//     console.log(`${req.hostname} ${req.method} ${res.statusCode} ${req.path}`);
//     next();
// });

// using 3rd party middleware
app.use(morgan('dev'));

// middleware to serve static files (css & images) to the client/browser
app.use(express.static('public'));

// middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// mongoose & mongoDB sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'Test Blog 2',
//         snippet: 'This is a test blog 2',
//         body: 'This is the body of the test blog 2'
//     });
//     blog.save().then(result => {
//         res.send(result)
//     }).catch(err => {
//         console.log(err);
//     })
// })


// app.get('/all-blogs', (req, res) => {
//     Blog.find().then(result => {
//         res.send(result)
//     }).catch(err => {
//         console.log(err);
//     })
// })

// home page
app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'Blog 1', snippet : 'This is the first blog' },
    //     { title: 'Blog 2', snippet : 'This is the second blog' },
    //     { title: 'Blog 3', snippet : 'This is the third blog' }
    // ]
    // res.render('index', {title: 'Home', blogs});
    // instead of creating a new home page, i am just redirecting the user to the blogs page
    res.redirect('/blogs')
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// middleware to get all the blog routes
app.use('/blogs',blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});