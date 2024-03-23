const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, '..', 'frontend', 'pages', `${page}.html`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            next();
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(data);
                }
            });
        }
    });
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'frontend', 'errors', '404.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, '..', 'frontend', 'errors', '500.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
