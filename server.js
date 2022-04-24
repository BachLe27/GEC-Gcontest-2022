const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./config/db');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');


const credentials = {
   ca: fs.readFileSync("./sslcert/ca_bundle.crt"),
   key: fs.readFileSync("./sslcert/private.key"),
   cert: fs.readFileSync("./sslcert/certificate.crt")
   // ca: fs.readFileSync("./sslcert/origin_ca_rsa_root.pem"),
   // key: fs.readFileSync("./sslcert/key.pem"),
   // cert: fs.readFileSync("./sslcert/cert.pem")
};

const PORT = process.env.PORT || 8443;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));

// app.use(cors());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html');
})

app.get('/.well-known/pki-validation/F082332B68071CC0ADBE0C2F37D461A2.txt', (req, res) => { 
   res.sendFile(__dirname + '/sslcert/F082332B68071CC0ADBE0C2F37D461A2.txt');
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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => { 
   console.log('HTTP Server running on port 8080');
});

httpsServer.listen(8443, () => {
   console.log('HTTPS Server running on port 8443');
});