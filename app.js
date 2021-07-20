const express = require('express');
const data = require('./data.json');
const app = express();

//view engine & static file link
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//--------------
//    Routes
//--------------

//route for the home route of the express app
app.get('/', (req, res) => {
    const dataP = data.projects;
    res.render('index', { dataP });
});

//route for the about section of the portfolio Express app
app.get('/about', (req, res) => {
    const dataP = data.projects;
    res.render('about', { dataP });
});

//route for projects with the ability to insert a param in the url and access a specific project
app.get('/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dataP = data.projects[id];

    // console.log(dataP)
    res.render('project', { dataP });
});



//-------------------------
//     Error Handlers
//-------------------------
// 404 Handler to catch undefined or non-existent routes and requests

app.use((req, res, next) => {
    // console.log('404 error handler has been called')
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Global Handler

app.use((err, req, res, next) => {
    // if (err) console.log('Global Handler has been called')

    if (err.status === 404) {
        res.render('not-found.pug', { err });
        console.log('Oops, a 404 error has occurred!')
    } else {
        console.log('Oops, a server error has occurred!')
        err.message = err.message || 'There was an error processing your request!';
        err.status = err.status || 500;
        res.render('page-not-found.pug', { err });
    }
});


app.listen(3000, () => {
    console.log('Server listing on port 3000\n');
});