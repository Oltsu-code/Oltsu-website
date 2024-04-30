const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/project/:project', handleProjectRequest);
app.get('/app/:app', handleAppRequest);
app.get('/:page', handlePageRequest);

app.use(handle404Error);
app.use(handle500Error);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function handleProjectRequest(req, res, next) {
    // TODO: add project handling
    next();
}

function handleAppRequest(req, res, next) {
    const app = req.params.app;
    const filePath = path.join(__dirname, '..', 'frontend', 'pages', 'projects', app, 'index.html');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            next();
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    next(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
}

function handlePageRequest(req, res, next) {
    const page = req.params.page;
    const filePath = path.join(__dirname, '..', 'frontend', 'pages', `${page}.html`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            next();
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    next(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
}

function handle404Error(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, '..', 'frontend', 'errors', '404.html'));
}

function handle500Error(err, req, res, next) {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, '..', 'frontend', 'errors', '500.html'));
}


