const express = require('express');

const app = express();
const directory = process.cwd();
const PORT = process.env.PORT || 3000;

app.get('/static/client.js', (req, res) => {
    res.sendFile(directory + '/dist/client.js');
});

app.get('*', (req, res) => {
    res.sendFile(directory + '/dist/index.html');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});