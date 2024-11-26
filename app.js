const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.resolve(__dirname, 'assets');
app.use(express.static(publicPath));
//const port = process.env.PORT || 3000;
const port = 3000;
app.listen(port, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log('server UUUUP')
});


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'))
});

app.get('/confirmacion', function (req, res) {
    res.sendFile(path.resolve(__dirname, './gracias.html'))
});


