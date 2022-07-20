const express = require('express')
const morgan = require('morgan')

const app = express()

// setting up the template engine
app.set('view engine', 'ejs');

// listening
app.listen(3000);

// middleware to get request details for every request being made
// app.use((req, res, next) => {
//     console.log(`${req.hostname} ${req.method} ${res.statusCode} ${req.path}`);
//     next();
// });

// using 3rd party middleware
app.use(morgan('dev'));

// middleware to serve static files (css & images) to the client/browser
app.use(express.static('public'));

// home page
app.get('/', (req, res) => {

    const blogs = [
        { title: 'Blog 1', snippet : 'This is the first blog' },
        { title: 'Blog 2', snippet : 'This is the second blog' },
        { title: 'Blog 3', snippet : 'This is the third blog' }
    ]

    res.render('index', {title: 'Home', blogs});
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// create new blog page
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new blog'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});