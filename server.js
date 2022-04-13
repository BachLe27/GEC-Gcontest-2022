const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./config/db');

const PORT = process.env.PORT || 80;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html');
})


app.get('/test', (req, res) => {
   res.sendFile(__dirname + '/views/test.html');
})

// Connect to database
database();

//router
app.use('/', require('./routes/main'));
app.use('/form', require('./routes/form'));
app.use('/manager', require('./routes/manager'));

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
})