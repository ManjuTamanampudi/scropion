var dotenv=require('dotenv');
dotenv.config()
var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
var request = require('request');
var http = require('http');
var https = require('https');
const httpsPort = 9001;
var options = {  
    key: fs.readFileSync('./key.pem', 'utf8'),  
    cert: fs.readFileSync('./server.crt', 'utf8')  
}; 
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const url = require('url');
var proxyServer = require('http-route-proxy');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.use(cors());

var admin = require('./admin.js');  
app.use('/admin', admin);  

var api = require('./api.js');  
app.use('/api', api);  

var secureServer = https.createServer(options, app).listen(process.env.HTTPS_PORT,process.env.IP, () => {  
    console.log(">> CentraliZr listening at port 9001" ); 
    var host = secureServer.address().address;
	var port = secureServer.address().port;
	console.log('Secure server at https://%s:%s', host, port); 
});
var server = app.listen(process.env.HTTP_PORT,process.env.IP, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Http Server at http://%s:%s', host, port);
})